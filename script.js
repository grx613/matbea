document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("phoneForm");
  if(form){
    form.addEventListener("submit", e => {
      e.preventDefault();
      const phone = document.getElementById("phone").value;
      if(phone.length < 10){
        alert("Введите корректный номер телефона");
        return;
      }
      document.getElementById("successMsg").style.display = "block";
      form.reset();
    });
  }
});
