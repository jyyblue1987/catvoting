<!DOCTYPE html>
<html lang="en" ng-app="app">
<head>
	<meta charset="utf-8">
	<base href="/" target="_blank">
	<title>Admin System</title>

	<!-- CSS -->
	<link rel="stylesheet" href="assets/libs/components-font-awesome/css/font-awesome.min.css" type="text/css" />
	<link rel="stylesheet" href="assets/libs/bootstrap/dist/css/bootstrap.css" type="text/css" />
	<link rel="stylesheet" href="assets/libs/angular-loading-bar/build/loading-bar.min.css" type="text/css" media="all" />
	<link rel="stylesheet" href="assets/libs/bootstrap/dist/css/bootstrap.css" type="text/css" />
	<link rel="stylesheet" href="assets/libs/AngularJS-Toaster/toaster.min.css" rel="stylesheet" />
	<link rel="stylesheet" href="assets/css/app.css" rel="stylesheet" />
	<link rel="stylesheet" href="assets/css/style.css" rel="stylesheet" />
	<link rel="stylesheet" href="assets/css/md.css" rel="stylesheet" />
	
</head>
<body ng-controller="AppCtrl">
	<div layout="column" flex ui-view></div>

	<!-- jquery -->
	<script type="text/javascript" src="assets/libs/jquery/dist/jquery.min.js"></script>

	<!-- Angular JS -->
	<script type="text/javascript" src="assets/libs/angular/angular.min.js"></script>
	<script type="text/javascript" src="assets/libs/angular-animate/angular-animate.min.js"></script>

	<!-- Toaster -->
	<script type="text/javascript" src="assets/libs/AngularJS-Toaster/toaster.min.js"></script>

	<!-- Storage -->
	<script type="text/javascript" src="assets/libs/ngstorage/ngStorage.min.js"></script>	

	<!-- UI Routing -->
	<script type="text/javascript" src="assets/libs/angular-ui-router/release/angular-ui-router.js"></script>
	
	<!-- bootstrap -->
  	<script type="text/javascript" src="assets/libs/bootstrap/dist/js/bootstrap.js"></script>
  	<script type="text/javascript" src="assets/libs/angular-bootstrap/ui-bootstrap-tpls.js"></script>

  	<!-- lazyload -->
  	<script type="text/javascript"  src="assets/libs/oclazyload/dist/ocLazyLoad.min.js"></script>

  	<script type="text/javascript" src="assets/libs/angular-loading-bar/build/loading-bar.min.js"></script>

	<script type="text/javascript" src="assets/libs/spin.js/spin.js"></script>
  	<script type="text/javascript" src="assets/libs/angular-spinner/angular-spinner.min.js"></script>
  	<script type="text/javascript" src="assets/libs/angular-loading-spinner/angular-loading-spinner.js"></script>

  	<script type="text/javascript" src="assets/libs/moment/moment.js"></script>

  	<!-- BootBox -->
  	<script type="text/javascript" src="assets/libs/bootbox/bootbox.js"></script>
    <script type="text/javascript" src="assets/libs/ngBootbox/dist/ngBootbox.min.js"></script>

    <!-- XML to JSON -->
    <script type="text/javascript" src="assets/libs/xml2json/xml2json.js"></script>

  	<script src="assets/admin/js/app.js"></script>
  	<script src="assets/common/config.js"></script>
  	<script src="assets/common/config.lazyload.js"></script>
  	<script src="assets/admin/js/config.router.js"></script>
  	<script src="assets/admin/services/auth.service.js"></script>
  	<script src="assets/admin/services/cat.service.js"></script>
  	<script src="assets/common/mydirective.js"></script>
  	<script src="assets/common/myfilter.js"></script>

  	<script src="assets/admin/js/main.js"></script>  	
</body>
</html>