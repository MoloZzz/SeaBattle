document.addEventListener('DOMContentLoaded', function () {
    const loginTab = document.getElementById('loginTab');
    const registrationTab = document.getElementById('registrationTab');
    const loginContent = document.getElementById('login');
    const registrationContent = document.getElementById('registration');
  
    loginTab.addEventListener('click', function () {
      loginTab.classList.add('active');
      registrationTab.classList.remove('active');
      loginContent.classList.add('show', 'active');
      registrationContent.classList.remove('show', 'active');
    });
  
    registrationTab.addEventListener('click', function () {
      registrationTab.classList.add('active');
      loginTab.classList.remove('active');
      registrationContent.classList.add('show', 'active');
      loginContent.classList.remove('show', 'active');
    });
  });