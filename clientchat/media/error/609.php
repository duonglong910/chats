<!DOCTYPE html>
<html>
<head>
<title>609 - Không tìm thấy lớp <?php echo ucfirst(self::$msg);?></title>
<meta charset="utf-8" http-equiv="content-type" content="text/html" />
<link href="<?php echo root().'media/css/error.css'?>" type="text/css" rel="stylesheet" />
</head>
<body>
    <div class="jdcart-errors">
        <h3><b>609</b> - Không tìm thấy lớp [<b><?php  echo ucfirst(self::$msg);?></b>]</h3>
        <div class="jdcart-errors-c">
            <p>Lớp [<?php echo ucfirst(self::$msg);?>] Có thể chưa được tạo ra</p>
            <p>Hoặc Tên đặt không đúng</p>
            <p>Hãy thông báo lỗi này này cho nhà phát triển</p>
            <p>Hặc quay lại trang chủ <a href="<?php echo base();?>">Trang chủ</a></p>
        </div>
    </div>
</body>
</html>