function danhSachSinhVien() {
    this.DSSV = [];
    // them sv
    this.themSinhVien = function (svThem) {
        this.DSSV.push(svThem);
    };

    // xoa sv
    this.xoaSinhVien = function (listSVXoa) {
        for (var i = 0; i < listSVXoa.length; i++) {
            for (var j = 0; j < this.DSSV.length; j++) {
                let sinhvien = this.DSSV[j];
                if (listSVXoa[i] == sinhvien.MaSv) {
                    this.DSSV.splice(j, 1)
                }
            }
        }


    };

    // sua sv
    this.suaSinhVien = function (svCapNhat) {

    };

    // tim kiem sv
    this.timKiemSinhVien = function (keywork) {

    };
}