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
        for (let i = 0; i < this.DSSV.length; i++) {
            let svUpdate = this.DSSV[i];

            if (svCapNhat.MaSv === svUpdate.MaSv) {
                svUpdate.HoTen = svCapNhat.HoTen;
                svUpdate.Cmnd = svCapNhat.Cmnd;
                svUpdate.Sodt = svCapNhat.Sodt;
                svUpdate.Email = svCapNhat.Email;
            }
        }

    };

    // tim kiem sv
    this.timKiemSinhVien = function (keywork) {

        //list kết quả tìm kiếm: DanhSachSinhVien
        var lstKetQuaTimKiem = new danhSachSinhVien();
        // console.log(lstKetQuaTimKiem);
        for (var i = 0; i < this.DSSV.length; i++) {
            let sinhvien = this.DSSV[i];

            // tìm kiếm sv khi user nhập ký tự hoa và thường đều trả về tất cả giá trị có trong DSSV
            if (sinhvien.HoTen.search(keywork) != -1 || sinhvien.HoTen.toLowerCase().search(keywork) != -1 || sinhvien.HoTen.toUpperCase().search(keywork) != -1) {
                lstKetQuaTimKiem.themSinhVien(sinhvien)
            }
        }
        return lstKetQuaTimKiem

        // cách 2 
        // var lstKetQuaTimKiem = new danhSachSinhVien()
        // for (var i = 0; i < this.DSSV.length; i++) {
        //     let sinhvien = this.DSSV[i];

        //     if (sinhvien.HoTen.indexOf(keywork) != -1 || (sinhvien.HoTen.toLowerCase().indexOf(keywork) != -1) || (sinhvien.HoTen.toUpperCase().indexOf(keywork) != -1)) {
        //         lstKetQuaTimKiem.themSinhVien(sinhvien)
        //     }
        // }
        // return lstKetQuaTimKiem
    };


    this.timSVTheoMa = function (masv) {
        for (var i = 0; i < this.DSSV.length; i++) {
            let sinhvien = this.DSSV[i];
            if (sinhvien.MaSv === masv) {
                return sinhvien;
            }
        }
        return null;
    }
}