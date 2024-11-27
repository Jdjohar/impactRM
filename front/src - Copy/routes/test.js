$(function () {
    $("#ajaxform").submit(function (e) {
        document.getElementById("btnSubmit").style.display = "none";
        e.preventDefault(); // stop the normal submission

        var data = JSON.stringify({ "country": country.value, "hpname": hpname.value, "email": email.value, "salutation": salutation.value, "facility": facility.value, "phone": phone.value, "gskproductname": gskproductname.value, "SubmitterName": SubmitterName.value, "SubmitterEmail": SubmitterEmail.value, "res_phone": res_phone.checked, "res_email": res_email.checked, "res_schedule": res_schedule.checked, "inquiry": inquiry.value, "confirm": confirm.value, "confirm2": confirm2.value });
        console.log(data);


        var participant = {
            json:data
        };
        // participant.json = data;
        // participant.created = new Date();
        // var participantObj = JSON.stringify(participant);

        $.ajax({
            url: "https://impactrm.onrender.com/api/v1/addParticipantData",
            method: "POST",
            data:JSON.stringify(participant),
            contentType: 'application/json; charset=utf-8',
            success: function () {
                $("#myModal3").modal('show');
            },
            error: function (xhr, status, error) {
                console.error("Submission failed:", status, error);
            }
        })
    });
});