(function(){
  'use strict';
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form=>{
    form.addEventListener('submit', function(e){
      if(!form.checkValidity()){
        e.preventDefault();
        e.stopPropagation();
      } else { alert('Form submitted!'); }
      form.classList.add('was-validated');
    });
  });
})();
