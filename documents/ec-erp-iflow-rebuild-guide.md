# EC to S/4 Employee Master Data iFlow Rebuild Guide

Source package: `documents/SAP SuccessFactors Employee Central Integration with SAP S_4HANA Cloud_ Employee Data`.
Primary extracted flow: `documents/_extracted_ec_erp/src/main/resources/scenarioflows/integrationflow/com_sap_ec2erp_ECToERPMasterDataReplication.iflw`.
Supporting resources: `documents/_extracted_ec_erp/src/main/resources/script/`, `documents/_extracted_ec_erp/src/main/resources/wsdl/`, `documents/_extracted_ec_erp/src/main/resources/parameters.prop`.

## What This Package Does

This is the standard SAP CPI flow **Replicate Employee Master Data from SAP SuccessFactors Employee Central to SAP S/4HANA Cloud**.
The rebuild notes below are derived from the extracted `.iflw`, scripts, WSDLs, and parameter files in `documents/_extracted_ec_erp/src/main/resources/`.

It has two trigger paths:

- **Scheduled load**: timer -> read parameters -> read last modified date -> query SuccessFactors Compound Employee API -> map/bundle -> send to S/4 -> write back last modified date.
- **Push load**: SuccessFactors push event -> extract `USER_ID` -> query SuccessFactors -> map/bundle -> send to S/4.

## Reconstructed Flow Topology

Main participants/endpoints:

- `EC_PUSH_EVENT` sender: SOAP sender for SuccessFactors push notifications.
- `EC_CE_API_QUERY` receiver: SOAP receiver for Compound Employee API.
- `S4_Cloud` receiver: SOAP receiver for employee master data replication.
- `ProcessDirect` endpoints: internal chaining between subflows.

Main subprocesses:

- `Scheduled Processing`
- `Push Processing`
- `Read External Parameters`
- `Read Last Modified Date`
- `Write Last Modified Date`
- `Query Employee Master Data`
- `Create Bundle Message and Send to S4`
- `Process S/4 data`

## External Parameters You Must Recreate

Key parameters used by the original package:

- `AUTHENTICATION`, `AUTHENTICATION_PUSH`
- `SFSF_EC_BASE_URL`, `SFSF_EC_PUSH_URL`, `SFSF_EC_LOGON_CREDENTIALS_NAME`
- `SFSF_EC_QUERY_PAGE_SIZE`, `SFSF_EC_TIMEOUT`, `SFSF_EC_SOAP_URL_SUFFIX`
- `SAP_ERP_ENDPOINT_URL`, `SAP_ERP_LOGON_CREDENTIALS_NAME`, `SAP_ERP_TIMEOUT`
- `PROCESS_DIRECT_URL`
- `FULL_TRANSMISSION_START_DATE`
- `CONTINGENT_WORKERS`
- `COMPANY`, `COUNTRY`, `EMPLOYEE_CLASS`
- `MATCHING_EMPLOYMENTS_ONLY`
- `ENABLE_TIME_DEPENDENT_EMPLOYEE_SELECTION`
- `MULTIPLE_JOB_EVENTS`
- `USER_SET_LAST_MODIFIED_DATE_TIME`
- `INITIATE_FULL_LOAD`
- `RETRY_WAIT_TIME_MS`
- `ENABLE_PAYLOAD_LOGGING`

## Simulator Contracts

### 1) SuccessFactors Push Simulator

Purpose: emulate the push notification sender.

Suggested endpoint:

- `POST /push`

Payload shape:

- SOAP 1.1 envelope
- root body element `ExternalEvent`
- event data contains `entity`, `entityKeys`, and `params`

Minimum useful fields for the flow:

- `externalEventMeta/sourceArea`
- `events/event/entityKeys/entityKey/name = assignment` or similar
- `events/event/entityKeys/entityKey/value`

Important behavior:

- Put `USER_ID` into the HTTP header or derive it from the payload so the flow skips the 5-minute delay path.

Sample:

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:ns2="com.successfactors.event.notification">
  <soapenv:Header/>
  <soapenv:Body>
    <ns2:ExternalEvent>
      <ns2:externalEventMeta>
        <ns2:sourceArea>ECT</ns2:sourceArea>
        <ns2:publishedBy>DEMO_USER</ns2:publishedBy>
      </ns2:externalEventMeta>
      <ns2:events>
        <ns2:event>
          <ns2:entity>AssignmentInformation</ns2:entity>
          <ns2:entityKeys>
            <ns2:entityKey><name>assignment</name><value>1000123</value></ns2:entityKey>
          </ns2:entityKeys>
        </ns2:event>
      </ns2:events>
    </ns2:ExternalEvent>
  </soapenv:Body>
</soapenv:Envelope>
```

### 2) SuccessFactors Compound Employee API Simulator

Purpose: emulate `queryCompoundEmployee`.

Suggested endpoint:

- `POST /sfapi/v1/soap`

Response shape:

- SOAP envelope
- body element `queryCompoundEmployeeResponse`
- one or more `CompoundEmployee` nodes
- include at least one `person` and one employment node so the router takes the "data found" path

Minimal response example:

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  <soapenv:Body>
    <queryCompoundEmployeeResponse>
      <CompoundEmployee>
        <person>
          <person_id_external>1000123</person_id_external>
          <user_id>1000123</user_id>
          <last_modified_on>2026-05-29T10:00:00Z</last_modified_on>
        </person>
        <employment_information>
          <isContingentWorker>0</isContingentWorker>
          <company>DEMO</company>
          <country>IN</country>
          <employee_class>REGULAR</employee_class>
        </employment_information>
        <job_information>
          <assignment_class>ST</assignment_class>
        </job_information>
      </CompoundEmployee>
    </queryCompoundEmployeeResponse>
  </soapenv:Body>
</soapenv:Envelope>
```

Behavior to simulate:

- return `0` records when you want the `No data found` branch
- return `1+` records when you want bundling/mapping and S/4 send to run
- optionally echo query parameters in logs for debugging

### 3) S/4 Receiver Simulator

Purpose: emulate the SOAP receiver endpoint for employee replication.

Suggested endpoint:

- `POST /s4/soap`

Payload shape:

- SOAP envelope with `EmployeeMasterDataReplicationRequest`

Recommended behavior:

- accept any valid XML payload
- return HTTP 200 with a SOAP success response
- optionally simulate failures with HTTP 500 to exercise retry logic

Useful fault mode:

- return HTTP 500 for the first 1-3 calls, then 200, to validate the retry scripts:
  - `initializeLoopCounter.groovy`
  - `script1.groovy`
  - `script2.groovy`
  - `script4.groovy`

## Rebuild Order In CPI

1. Create one integration flow with:
   - timer sender for scheduled path
   - SOAP sender for push path
   - two process-direct endpoints for internal handoff
   - SOAP receiver for SuccessFactors query
   - SOAP receiver for S/4 send
2. Add the parameter set above and keep the default values close to the exported package.
3. Recreate the Groovy/GSH scripts from `documents/_extracted_ec_erp/src/main/resources/script`.
4. Recreate the routing:
   - scheduled path sets process variant and reads/writes last modified date
   - push path reads `USER_ID` and goes straight to query
   - query path builds filter + SFAPI parameters
   - S/4 path handles retry and optional 5-minute wait
5. Plug in the simulators and validate:
   - push event hits the push path
   - query simulator returns one record
   - receiver simulator accepts the mapped S/4 SOAP message

## Implementation Notes

- `SetQueryParameter.gsh` is the core logic for building the Compound Employee query and SFAPI flags.
- `script1.groovy` / `script4.groovy` / `script2.groovy` / `script3.groovy` implement retry and exception-counter behavior.
- `script5.groovy` enforces the 5-minute wait only for non-push execution.

## Best Next Step

If you want, I can turn this into a concrete mock setup next:

- a local Node/Python simulator for the three endpoints, or
- a CPI rebuild checklist with exact adapter settings and payload samples.
