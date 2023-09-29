$(document).ready(function () {
    $("#registration-form").validate({
      errorPlacement: function (error, element) {
        
        error.appendTo(element.next("label.error"));
      },
      rules: {
        username: {
          required: true,
          minlength: 5,
        },
        email: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          minlength: 8,
        },
        "confirm-password": {
          required: true,
          equalTo: "#password",
        },
      },
      messages: {
        username: {
          required: "Please enter your username",
          minlength: "Username must be at least 5 characters long",
        },
        email: {
          required: "Please enter your email address",
          email: "Please enter a valid email address",
        },
        password: {
          required: "Please enter your password",
          minlength: "Password must be at least 8 characters long",
        },
        "confirm-password": {
          required: "Please confirm your password",
          equalTo: "Passwords do not match",
        },
      },
    });
  });
  