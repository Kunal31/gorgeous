 $(document).ready(function(){
        $('#send_message').click(function(e){
            
            //Stop form submission & check the validation
            e.preventDefault();
            
            // Variable declaration
            var error = false;
            var name = $('#name').val();
            var email = $('#email').val();
			var phone = $('#phone').val();
            var message = $('#message').val();
			var date = $('#date').val();
			var time = $('#time option:selected').val();
			var stylist = $('input[name=stylist]:checked').val();
			var services = $("#select-services option:selected").map(function () {
				return $(this).text();
			}).get().join();
			
			
			$('#name,#email,#phone,#message,#date,#select-services').click(function(){
				$(this).removeClass("error_input");
			});
            
         	// Form field validation
            if(name.length == 0){
                var error = true;
                $('#name').addClass("error_input");
            }else{
                $('#name').removeClass("error_input");
            }
            if(email.length == 0 || email.indexOf('@') == '-1'){
                var error = true;
                $('#email').addClass("error_input");
            }else{
                $('#email').removeClass("error_input");
            }
			if(phone.length == 0){
                var error = true;
                $('#phone').addClass("error_input");
            }else{
                $('#phone').removeClass("error_input");
            }
            if(!$('#select-services').val()) {
                var error = true;				
                $('#select-services').addClass("error_input");
            }else{
                $('#select-services').removeClass("error_input");
				// alert(services);
            }
			if(date.length == 0){
                var date = true;
                $('#date').addClass("error_input");
            }else{
                $('#date').removeClass("error_input");
            }
			
            // If there is no validation error, next to process the mail function
            if(error == false){
               // Disable submit button just after the form processed 1st time successfully.
                $('#send_message').attr({'disabled' : 'true', 'value' : 'Sending...' });
                
				/* Post Ajax function of jQuery to get all the data from the submission of the form as soon as the form sends the values to email.php*/
                $.post("booking.php", $("#form_booking").serialize(),function(result){
                    //Check the result set from email.php file.
                    if(result == 'sent'){
                        //If the email is sent successfully, remove the submit button
                         $('#submit').remove();
                        //Display the success message
                        $('#mail_success').fadeIn(500);
                    }else{
                        //Display the error message
                        $('#mail_fail').fadeIn(500);
                        // Enable the submit button again
                        $('#send_message').removeAttr('disabled').attr('value', 'Send The Message');
                    }
                });
            }
        });    
    });