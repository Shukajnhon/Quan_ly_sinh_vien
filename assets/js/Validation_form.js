function ValidationForm() {
    this.KiemTraRong = function (value) {
        if (value.trim() === '') {
            return true;
        }
        return false;
    }

    this.KiemTraEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    this.KiemTraSoDT = function (phoneNumber) {
        var regexPhoneNumber = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        //var regexPhoneNumber = /^\d{11}$/; // số 11 trong ngoặc chỉ độ dài số đt
        // kiểm tra số đt và giới hạn độ dài số điện thoại
        if (regexPhoneNumber.test(phoneNumber)) {
            return true
        }
        return false;
    }
}
