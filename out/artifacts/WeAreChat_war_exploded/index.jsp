<%@ page import="javax.websocket.Session" %>
<%--
  Created by IntelliJ IDEA.
  User: Benco
  Date: 2015/4/23
  Time: 22:54
--%>
<!DOCTYPE html>
<html lang="zh">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>WeChatRoom</title>

<title>WeChat</title>

<link rel="alternate icon" href="./assets/images/favicons.ico">
<link rel="stylesheet" href="./assets/css/amazeui.min.css">
<link rel="stylesheet" href="./assets/css/app.css">

<!-- umeditor css -->
	<link rel="stylesheet" href="./umeditor/themes/default/css/umeditor.css">
	<script src="./umeditor/third-party/jquery.min.js"></script>
	<script type="text/javascript" src="./umeditor/umeditor.config.js"></script>
	<script type="text/javascript" src="./umeditor/umeditor.js"></script>
	<script type="text/javascript" src="./umeditor/lang/zh-cn/zh-cn.js"></script>
	<script type="text/javascript">
		$(function(){
			window.um = UM.getEditor('myEditor', {
				toolbar: ['undo redo | bold italic underline']
			});
		});
	</script>
	<script src="./fk.js"></script>
	<link href="./assets/css/bootstraps.css" rel="stylesheet">
	<style type="text/css">
		body {
			padding-top: 60px;
			padding-bottom: 40px;
		}
		.sidebar-nav {
			padding: 9px 0;
		}
	</style>
	<link href="./assets/css/bootstrap-responsive.css" rel="stylesheet">
<style>
.title {
	text-align: center;
}

.chat-content-container {
	height: 29rem;
	overflow-y: scroll;
	border: 1px solid silver;
}
.fuck-inline {
	display: inline;
}
</style>
</head>
<body>
<div class="navbar navbar-fixed-top">
	<div class="navbar-inner">
		<div class="container-fluid">
			<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</a>
			<p class="brand" >WelCome To The WeChat</p>
			<div class="nav-collapse">
				<ul class="nav pull-right">
					<li>
						<form class="form-inline" id="form-login">
							<input type="text" class="input-small" id="nickname" placeholder="nickname">
							<input type="password" class="input-small" id="passwd" placeholder="passwd">
							<button type="submit" class="btn">Login</button>
						</form>
					</li>
					<li>
						<form class="form-inline" id="form-register">
							<input type="text" class="input-small" id="nickname-reg" placeholder="nickname">
							<input type="password" class="input-small" id="passwd-reg" placeholder="passwd">
							<input type="password" class="input-small" id="passwd2-reg" placeholder="comfirm">
							<button type="submit" class="btn">Register</button>
						</form>
					</li>
					<li><a href="#" class="login">Login</a></li>
					<li><a href="#" class="register">Register</a></li>
				</ul><!-- end ul -->
				<span class="pull-right label label-success"></span>
				<span class="pull-right label label-warning"></span>
				<span class="pull-right label label-important"></span>
			</div><!--/.nav-collapse -->
		</div>
	</div>
</div>
	<!-- chat content start -->
	<div class="chat-content">
		<div class="am-g am-g-fixed chat-content-container">
			<div class="am-u-sm-12">
				<ul id="message-list" class="am-comments-list am-comments-list-flip"></ul>
			</div>
		</div>
	</div>
	<!-- chat content start -->

	<!-- message input start -->
	<div class="message-input am-margin-top">
		<div class="fuck-inline">
			<div class="am-g am-g-fixed">
				<div class="am-u-sm-12">
					<form class="am-form">
						<div class="am-form-group">
							<script id="myEditor" class="content" type="text/plain" style="width:100%;height:200px;"></script>
						</div>
					</form>
				</div>
			</div>
		</div>
		<div class="fuck-inline">
			<div class="am-g am-g-fixed am-margin-top">
				<div class="am-u-sm-6">
					<button id="sendmsg" type="button" class="am-btn am-btn-primary" >
						<i class="am-icon-send"></i> Send
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- message input end -->

	<!--[if (gte IE 9)|!(IE)]><!-->
	<script src="assets/js/jquery.min.js"></script>
	<!--<![endif]-->
	<!--[if lte IE 8 ]>
	<script src="http://libs.baidu.com/jquery/1.11.1/jquery.min.js"></script>
	<![endif]-->
	
	<!-- umeditor js -->
	<script charset="utf-8" src="umeditor/umeditor.config.js"></script>
	<script charset="utf-8" src="umeditor/umeditor.min.js"></script>
	<script src="umeditor/lang/zh-cn/zh-cn.js"></script>
</body>
</html>