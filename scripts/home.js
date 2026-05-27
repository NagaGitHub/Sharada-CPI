// Homepage-specific JS: form handling and widget bootstrap
function submitForm() {
  const fname = document.getElementById('fname').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const course = document.getElementById('course').value;
  if (!fname || !phone || !course) {
    alert('Please fill in Name, Phone, and Course selection.');
    return;
  }
  document.getElementById('formContent').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}

async function bootstrapSimulatorWidget() {
  const cssHref = 'simulator/renderer/web/runner_controls.css';
  const mountNode = document.getElementById('runner-panel');
  if (!mountNode) return;
  const params = new URLSearchParams(window.location.search);
  const configuredApiBaseUrl =
    mountNode.dataset.apiBaseUrl ||
    window.SIMULATOR_API_BASE_URL ||
    params.get('simApi') ||
    '';

  if (!document.querySelector(`link[href="${cssHref}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssHref;
    document.head.appendChild(link);
  }

  try {
    const runnerModule = await import('./runner_widget.js');
    if (typeof runnerModule.initRunnerControls === 'function') {
      runnerModule.initRunnerControls({
        root: mountNode,
        apiBaseUrl: configuredApiBaseUrl || undefined,
        title: 'Drone Mission Runner',
        note: 'Submit approved MissionRunner scripts to the simulator endpoint configured for this page.',
      });
    }
  } catch (error) {
    console.error('Failed to initialize the simulator runner widget.', error);
    mountNode.innerHTML = '<div class="runner-widget-error">Unable to load the simulator runner widget. Please check the browser console for details.</div>';
  }
}


document.addEventListener('DOMContentLoaded', () => {
  // Attach form handler
  const formBtn = document.querySelector('.submit-btn');
  if (formBtn) formBtn.onclick = submitForm;
  // Prepare simulator mount if needed
  bootstrapSimulatorWidget();
});
