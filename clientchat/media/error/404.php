<!DOCTYPE html>
<html>
<head>
<?php if(!empty(self::$msg)) $filename=self::$msg;?>
<title>404 - Không tìm thấy file <?php echo $filename;?></title>
<meta charset="utf-8" http-equiv="content-type" content="text/html" />
<link href="<?php echo root().'media/css/error.css'?>" type="text/css" rel="stylesheet" />
</head>
<body>
    <div class="jdcart-errors">
        <h3><b>404</b> - Không tìm thấy file</h3>
        <div class="jdcart-errors-c">
            <p>File:<b class="red">[<?php  echo $filename;?>]</b> chưa được tạo ra</p>
            <p>Hoặc Tên đặt không đúng</p>
            <p>Hãy thông báo lỗi này này cho nhà phát triển</p>
            <p>Hặc quay lại trang chủ <a href="<?php echo base();?>">Trang chủ</a></p>
        </div>
    </div>
</body>
</html>