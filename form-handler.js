// Dedicated script for the contact form on the homepage
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
