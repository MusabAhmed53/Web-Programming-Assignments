$(document).ready(function () {
    dataTable = $('#applicationTable').DataTable();

    $('#jobApplicationForm').submit(function (event) {
        event.preventDefault();

        $('.form-control').css('border-color', '');
        if (validateForm()) {
            console.log($(this).serialize());
            const formData = {
                'First Name': $('#firstName').val(),
                'Last Name': $('#lastName').val(),
                'Phone Number': $('#phoneNumber').val(),
                'Email Address': $('#emailAddress').val(),
                'Cover Letter': $('#coverLetter').val() // Assuming cover letter is a textarea
            };

            dataTable.row.add(Object.values(formData)).draw();
            $(this).trigger('reset');
        } else {
        }
    });

    $('#viewTableBtn').click(function () {
        $('#applicationsTableSection').show();
    });

    function validateForm() {
        let isValid = true;
        $('.form-control[required]').each(function () {
            const fieldValue = $(this).val().trim();

            if (fieldValue === '') {
                $(this).css('border-color', 'red');
                isValid = false;
                return false; 
            }

            const fieldName = $(this).attr('name');
            switch (fieldName) {
                case 'emailAddress':
                    if (!validateEmail(fieldValue)) {
                        // Highlight the invalid email field
                        $(this).css('border-color', 'red');
                        isValid = false;
                        return false;
                    }
                    break;
                case 'phoneNumber':
                    if (!validatePhoneNumber(fieldValue)) {
                        // Highlight the invalid phone number field
                        $(this).css('border-color', 'red');
                        isValid = false;
                        return false;
                    }
                    break;
            }
        });

        return isValid;
    }

    // Email format validation function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Phone number format validation function
    function validatePhoneNumber(phoneNumber) {
        return /^03\d{9}$/.test(phoneNumber);
    }
});