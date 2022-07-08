$('#modalEdit').on('show.bs.modal', function (event) {
    let user = $(event.relatedTarget);
    $("#modalEdit #editId").val(user.data('id'));
    $("#modalEdit #editUsername").val(user.data('username'));
    $("#modalEdit #editFirstName").val(user.data('firstname'));
    $("#modalEdit #editLastName").val(user.data('lastname'));
    $("#modalEdit #editAge").val(user.data('age'));
    $("#modalEdit #editPassword").val(user.data('password'));
    $("#modalEdit #editRolesSelector").val(user.data('roles'));
});

$('#modalDelete').on('show.bs.modal', function (event) {
    let user = $(event.relatedTarget);
    $("#modalDelete #deleteId").val(user.data('id'));
    $("#modalDelete #deleteUsername").val(user.data('username'));
    $("#modalDelete #deleteFirstName").val(user.data('firstname'));
    $("#modalDelete #deleteLastName").val(user.data('lastname'));
    $("#modalDelete #deleteAge").val(user.data('age'));
    $("#modalDelete #deletePassword").val(user.data('password'));
    $("#modalDelete #deleteRolesSelector").val(user.data('roles'));
});