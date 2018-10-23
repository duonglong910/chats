$rootScope.JExportPrinter=function(id){ 
	var mywindow = window.open();
	var html = $("#"+id).html(); 
	var styles =$("#printe-style").html(); 
	mywindow.document.write(\'<html><head><title>Công ty</title>\'); mywindow.document.write(\'<style>\'+styles+\'</style>\');
	mywindow.document.write(\'</head><body>\');
	mywindow.document.write(html);
	mywindow.document.write(\'</body></html>\'); 
	mywindow.print(); 
	mywindow.close();
	return true;
};
$scope.filename = 'export-file-' + $scope.daily;
/** php
function initExport(){

             $this->setAngular('file-saver/FileSaver.min');
             $this->setAngular('json-export-excel/dest/json-export-excel.min');
             $this->setAngular('ngPrint.min');
             $this->styleSheet(JD_URL_ANGULAR.'ngPrint.min');
          }
**/
/** html 
 <div class="padding-5">
            Lịch dạy học của giáo viên hôm nay  <b class="color-red">Thứ {{wd}}</b> có <b class="color-green">{{listItemsList.length}} tiết dạy</b>
            <div class="pull-right btn-group">
                <a href="#" class="btn-sm btn-success" ng-json-export-excel data="listItemsList"
                   report-fields="{tiet: 'Tiết', thu: 'Thứ', ngayday: 'Ngày',lop:'Lớp',teachername:'Tên giáo viên',schoolname:'Trường',districtname:'Quận/Huyện',cityname:'Tỉnh/Thành phố'}" filename="filename">
                    <i class="fa fa-pencil fa-fw"></i>&nbsp;Xuất Excel
                </a>
                &nbsp;&nbsp;
                <a href="#" class="btn-sm btn-default btn-border" ng-click="JExportPrinter('printThisElement')">
                    <i class="fa fa-print fa-fw" aria-hidden="true"></i>&nbsp;IN
                </a>
            </div>
            <div class="clearfix"></div>
        </div>
		*/