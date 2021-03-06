/* globals $ toastr */

toastr.options.positionClass = 'toast-bottom-right';

$(document).ready(() => {
    const regBtn = $('#reg-btn');

    regBtn.on('click', (event) => {
        event.preventDefault();
        const usernameForm = $('#username').val();
        const passwordForm = $('#password').val();
        const emailForm = $('#email').val();
        const bioForm = $('#bio').val();

        const pattern = new RegExp(/^[a-zA-Z0-9._]{3,20}$/);
        const passPattern = 
            new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/);
        const emailPattern = new RegExp(/(.+)@(.+){2,}\.(.+){2,}/);
        const usernameTest = pattern.test(usernameForm);
        const passTest = passPattern.test(passwordForm);
        const emailTest = emailPattern.test(emailForm);

        if (!usernameTest) {
            toastr.error(`Invalid username. 
            Allowed characters: all leters, numbers, dots and underscore. 
            Atleast 3 characters long.`);
            return;
        }

        if (!passTest) {
            toastr.error(`Invalid password. 
            Must be at least 4 characters long and must include
            letters in mixed case and numbers.`);
            return;
        }

        if ($('#password').val() !== $('#password-repeat').val()) {
            toastr.error('Passwords do not match!');
            return;
        }

        if (emailForm.length > 1 && !emailTest) {
            toastr.error(`Invalid email.
            Must be in the format sample@email.com.`);
            return;
        }

        $.ajax({
            type: 'POST',
            url: '/auth/sign-up',
            data: {
                username: usernameForm,
                password: passwordForm,
                email: emailForm,
                bio: bioForm,
            },
            success: (data) => {
                toastr.success('Registration done');
                window.location = '/auth/sign-in';
            },
            error: (request, status, error) => {
                toastr.error('Invalid username or password');
            },
        });
    });
});
