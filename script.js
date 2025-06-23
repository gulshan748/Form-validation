    
  let startTime;

    function startTimer() {
      startTime = Date.now();
    }
   // This function toggles the visibility of the password input field.
    function togglePassword(fieldId, btnElement) {
      var input = document.getElementById(fieldId);
      if (input.type === 'password') {
        input.type = 'text';
        btnElement.innerText = 'Hide Password';
      } else {
        input.type = 'password';
        btnElement.innerText = 'Show Password';
      }
    }
    // this funtion will removes non-digits in phone number
     $("#phonenumber").on("input", function () {
    this.value = this.value.replace(/\D/g, ""); 
    });

    //   This starts a reaction timer to track how long a user takes to fill and submit the form.
    $(document).ready(function () {
      startTimer();

    //   This function checks whether the entered email is valid using a regular expression (regex):
      function isEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      }

      function isPasswordStrong(password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
      }

      $('#myForm').on('submit', function (e) {

    //  This prevents the default form submission
        e.preventDefault();

        var errorMsg = '';

        var name = $('#name').val().trim();
        var email = $('#email').val().trim();
        var phone = $('#phonenumber').val().trim();
        var password = $('#password').val().trim();
        var confirmPassword = $('#confirmpassword').val().trim();


        // this entire if and else funtion will check the conditions for the proper filling of the form  ..... if not filled as with required format , the page will do not load and reloads to the same  ...... and  will also popup a box (Green for successfully sumitted)(Red for errors and will show invalidate input formats)
        $('#messageBox').removeClass('error success').html('').hide();

         if (name === '') errorMsg += '• Name is    required<br>';
        if (email === '') errorMsg += '• Email is required<br>';
         if (phone === '') errorMsg += '• Phone number is required<br>';
        if (password === '') errorMsg += '• Password is required<br>';
        if (confirmPassword === '') errorMsg += '•  Confirm Password is required<br>';

        if (email && !isEmail(email)) {
          errorMsg += '• Invalid email format (e.g. user@example.com)<br>';
        }

        if (phone && !/^\d{10}$/.test(phone)) {
          errorMsg += '• Phone number must be exactly 10 digits<br>';
        }

        if (password && !isPasswordStrong(password)) {
          errorMsg += '• Password must have 8+ chars with uppercase, lowercase, and number<br>';
        }

        if (password && confirmPassword && password !== confirmPassword) {
          errorMsg += '• Password and Confirm Password do not match<br>';
        }

        if (errorMsg !== '') {
          $('#messageBox').addClass('error').html(errorMsg).fadeIn();
        } else {
          let reaction = ((Date.now() - startTime) / 1000).toFixed(2);
          $('#messageBox').addClass('success').html('✅ Form submitted successfully!<br>⏱ Reaction Time: ' + reaction + ' seconds').fadeIn();
        }
      });
    });
