1) Minimize token usage by avoiding broad repo scans unless necessary
2) Use separate tracking files under `documents/` instead of appending to large tracker files.
3) add unit tests, QA/QC to ensure new changes not breaking exiting functionalities along with docker, 
4) check the there is no file truncated issue while you write as we are facing this issue consistently and the content is fully written to respective files.
5) Do not preserve legacy test files just because they already exist; replace them with smaller current tests when appropriate
6) Identify and remove legacy files once replacements are in place and references are verified.
7) refer C:\Data\github\Sharada-CPI\documents\AGENTS.md for instructions , tracking progress session_pending_actions.md and  Website_MODULAR-ARCHITECTURE.md under simulator\documents\ 
8) avoid growing large historical tracker files
9) apply strategy to manage code in the files, iike splting the files, so that next session can do work with minimmum tockens
