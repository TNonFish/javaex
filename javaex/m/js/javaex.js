/**
 * 作者：陈霓清
 * 官网：http://www.javaex.cn
 */
; (function() {
	var javaex = function() {
		function defaults(args) {
			var defaults = {
				id: "",
				content: "",
				confirmName: "确定",
				cancelName: "取消",
				callback: function() {
					return true
				},
				type: "",
				menu: "",
				live: 2000,
				delay: 2000,
				title: "",
				fill: "auto",
				scriptArr: [],
				loadDataFunction: "",
				current: 1,
				date: ""
			};
			return $.extend(defaults, args)
		}
		var info = {
			generateID: function() {
				return Date.now().toString(36) + Math.random().toString(36).substr(3, 3)
			},
			getTime: function(param) {
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				if (!param) {
					if (month >= 1 && month <= 9) {
						month = "0" + month
					}
					if (day >= 1 && day <= 9) {
						day = "0" + day
					}
					return year + "-" + month + "-" + day + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
				} else {
					param = param.toLowerCase();
					if (param == "year") {
						return year
					}
					if (param == "month") {
						return month
					}
					if (param == "day") {
						return day
					}
					if (month >= 1 && month <= 9) {
						month = "0" + month
					}
					if (day >= 1 && day <= 9) {
						day = "0" + day
					}
					if (param == "today") {
						return year + "-" + month + "-" + day
					}
					if (param == "week") {
						var week = date.getDay();
						if (week == 0) {
							week = 7
						}
						return week
					}
				}
			},
			getTimeDiff: function(startTime, endTime, type) {
				startTime = startTime.replace(/\-/g, "/");
				endTime = endTime.replace(/\-/g, "/");
				type = type.toLowerCase();
				var sTime = new Date(startTime);
				var eTime = new Date(endTime);
				var divNum = 1;
				switch (type) {
				case "second":
					divNum = 1000;
					break;
				case "minute":
					divNum = 1000 * 60;
					break;
				case "hour":
					divNum = 1000 * 3600;
					break;
				case "day":
					divNum = 1000 * 3600 * 24;
					break;
				default:
					break
				}
				return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum))
			},
			alert: function(args) {
				var opt = defaults(args);
				var UUID = info.generateID();
				var alertHtml = '<div id=' + UUID + ' class="mask">';
				alertHtml += '<div class="container">';
				alertHtml += '<div class="dialog animated fadeInUp">';
				alertHtml += '<div class="dialog-content">';
				alertHtml += opt.content;
				alertHtml += '</div>';
				alertHtml += '<div class="dialog-button-container">';
				alertHtml += '<button class="button dialog-button" onclick="if(' + opt.callback + '!=false)javaex.close(\'' + UUID + '\');">' + opt.confirmName + '</button>';
				alertHtml += '</div>';
				alertHtml += '</div>';
				alertHtml += '</div>';
				alertHtml += '</div>';
				$(document.body).append(alertHtml)
			},
			confirm: function(args) {
				var opt = defaults(args);
				var UUID = info.generateID();
				var confirmHtml = '<div id=' + UUID + ' class="mask">';
				confirmHtml += '<div class="container">';
				confirmHtml += '<div class="dialog animated fadeInUp">';
				confirmHtml += '<div class="dialog-content">';
				confirmHtml += opt.content;
				confirmHtml += '</div>';
				confirmHtml += '<div class="dialog-button-container">';
				confirmHtml += '<button class="button dialog-button" onclick="javaex.close(\'' + UUID + '\');">' + opt.cancelName + '</button>';
				confirmHtml += '<button class="button dialog-button" onclick="if(' + opt.callback + '!=false)javaex.close(\'' + UUID + '\');">' + opt.confirmName + '</button>';
				confirmHtml += '</div>';
				confirmHtml += '</div>';
				confirmHtml += '</div>';
				confirmHtml += '</div>';
				$(document.body).append(confirmHtml)
			},
			tip: function(args) {
				var opt = defaults(args);
				var UUID = info.generateID();
				var tipHtml = '<div id=' + UUID + ' class="tip">';
				tipHtml += '<div class="container">';
				tipHtml += '<div class="tip-content">';
				tipHtml += opt.content;
				tipHtml += '</div>';
				tipHtml += '</div>';
				tipHtml += '</div>';
				$(document.body).append(tipHtml);
				setTimeout(function() {
					var oDialog = document.getElementById(UUID);
					oDialog.remove()
				},
				opt.live)
			},
			loading: function(args) {
				var opt = defaults(args);
				var UUID = info.generateID();
				var loadingHtml = '<div id=' + UUID + ' class="mask" style="background: rgba(0,0,0,0);">';
				loadingHtml += '<div style="margin: auto;">';
				loadingHtml += '<div class="loading">';
				loadingHtml += '<i></i>';
				loadingHtml += '<p>' + opt.content + '</p>';
				loadingHtml += '</div>';
				loadingHtml += '</div>';
				$(document.body).append(loadingHtml)
			},
			closeLoading: function() {
				$(".mask").remove()
			},
			dialog: function(args) {
				var opt = defaults(args);
				var type = opt.type;
				var UUID = info.generateID();
				var dialogHtml = '';
				if (type == "menu") {
					var json = opt.menu;
					var menuHtml = '';
					for (var key in json) {
						if (json[key] == "") {
							menuHtml += '<button class="button dialog-button" onclick="javaex.close(\'' + UUID + '\');" style="color: #999;">' + key + '</button>'
						} else {
							menuHtml += '<button class="button dialog-button" onclick="javaex.close(\'' + UUID + '\');' + json[key] + ';">' + key + '</button>'
						}
					}
					dialogHtml = '<div id=' + UUID + ' class="mask">';
					dialogHtml += '<div class="container">';
					dialogHtml += '<div class="dialog animated fadeInUp">';
					dialogHtml += '<div class="dialog-button-container vertical">';
					dialogHtml += menuHtml;
					dialogHtml += '</div>';
					dialogHtml += '</div>';
					dialogHtml += '</div>';
					dialogHtml += '</div>'
				} else if (type == "html") {
					var fill = opt.fill;
					var title = opt.title;
					var scriptArr = opt.scriptArr;
					dialogHtml += '<div id=' + UUID + ' class="popup">';
					if (title != "") {
						dialogHtml += '<div class="dialog-title">' + opt.title + '</div>';
						dialogHtml += '<span class="icon-close" style="position: absolute;right: 10px;top: 0;line-height: 1.25rem;font-size: 0.6rem;color:#666;" onclick="javaex.close(\'' + UUID + '\');"></span>'
					}
					dialogHtml += '<div class="operation">' + opt.content + '</div>';
					dialogHtml += '<div class="button-cancel" onclick="javaex.close(\'' + UUID + '\');">关闭</div>';
					dialogHtml += '</div>';
					if (scriptArr.length > 0) {
						for (var i = 0; i < scriptArr.length; i++) {
							dialogHtml += '<script src=' + scriptArr[i] + '></script>'
						}
					}
				}
				$(document.body).append(dialogHtml);
				if (type == "html") {
					if (fill == "auto") {} else if (fill == "100%") {
						if (title == "") {
							$(".popup .operation").css("height", $(document).height() - $(".button-cancel").height() - 32 + "px")
						} else {
							$(".popup .operation").css("height", $(document).height() - $(".dialog-title").height() - $(".button-cancel").height() - 32 + "px")
						}
					} else {
						if (title == "") {
							$(".popup .operation").css("height", $(document).height() - $(document).height() * parseInt(fill) / 100 - $(".button-cancel").height() - 32 + "px")
						} else {
							$(".popup .operation").css("height", $(document).height() - $(document).height() * parseInt(fill) / 100 - $(".dialog-title").height() - $(".button-cancel").height() - 32 + "px")
						}
					}
					$("#" + UUID).before('<div class="mask"></div>');
					$("#" + UUID).css("transform", "translateY(0px)");
					$(".mask").click(function() {
						$(".mask").remove();
						$("#" + UUID).css("transform", "translateY(100%)");
						setTimeout(function() {
							info.close(UUID)
						},
						300)
					})
				}
			},
			close: function(UUID) {
				var ogMask = document.querySelector(".g-mask");
				var oDialog = document.getElementById(UUID);
				if (ogMask != null) {
					ogMask.remove();
					oDialog.style.bottom = -(oDialog.offsetHeight) + "px";
					oDialog.classList.remove("fadeInUp");
					oDialog.classList.add("fadeInDown");
					setTimeout(removeDialog, 300)
				} else {
					oDialog.remove();
					var oMask = document.querySelector(".mask");
					if (oMask != null) {
						oMask.remove()
					}
				}
				function removeDialog() {
					oDialog.remove()
				}
			},
			render: function(id) {
				if ( !! id) {
					$('#' + id + ' [class^="equal-"]').each(function() {
						var classArr = $(this).attr("class").split(" ");
						for (var i = 0; i < classArr.length; i++) {
							if (classArr[i].indexOf("equal-") >= 0) {
								var num = classArr[i].split("-")[1];
								$(this).children("li").css("width", (100 / num) + "%")
							}
						}
					});
					$('#' + id + ' [class^="grid-"]').each(function() {
						var classArr = $(this).attr("class").split(" ");
						for (var i = 0; i < classArr.length; i++) {
							if (classArr[i].indexOf("grid-") >= 0) {
								var arr = classArr[i].split("-");
								var sum = 0;
								for (var j in arr) {
									if (j > 0) {
										sum = parseInt(sum) + parseInt(arr[j])
									}
								}
								$(this).children("div").each(function(k) {
									$(this).css("width", (100 / sum) * arr[k + 1] + "%")
								})
							} else if (classArr[i].indexOf("spacing-") >= 0) {
								var spacing = classArr[i].split("-")[1];
								var width = "calc(100% + " + parseInt(spacing) + "px)";
								$(this).css("width", width);
								$(this).children("div").each(function(k) {
									$(this).css("margin-right", parseInt(spacing) + "px")
								})
							}
						}
					})
				} else {
					$("script").each(function() {
						if ( !! $(this).attr("src")) {
							if ($(this).attr("src").indexOf("common.js") > -1) {
								var jsSrc = $(this).attr("src");
								var script = document.createElement("script");
								script.src = jsSrc;
								$(document.body).append(script)
							}
							if ($(this).attr("src").indexOf("javaex-formVerify.js") > -1) {
								var jsSrc = $(this).attr("src");
								var script = document.createElement("script");
								script.src = jsSrc;
								$(document.body).append(script)
							}
						}
					})
				}
			},
			nav: function(args) {
				var opt = defaults(args);
				if (opt.type == "slide") {
					if ($("#slide-bottom") != null) {
						var height = $("#slide-bottom").height();
						$("#slide-list").css("height", "calc(100% - " + (160 + height) + "px)")
					}
					$("#slide-nav").before('<div class="mask"></div>');
					$("#slide-nav").css("transform", "translateX(" + $("#slide-nav").width() + "px)");
					$(".mask").click(function() {
						$(".mask").remove();
						$("#slide-nav").css("transform", "translateX(0px)")
					})
				} else if (opt.type == "guide") {
					if ($("#guide-nav > ul").hasClass("active")) {
						$("#guide-nav > ul").removeClass("active");
						$("#guide-nav ul").css("height", "1rem")
					} else {
						var liCount = $("#guide-nav > ul > li").length;
						var row = Math.ceil((liCount + 1) / 5);
						$("#guide-nav > ul").addClass("active");
						$("#guide-nav ul.active").css("height", (row + 0.2) + "rem")
					}
				}
			},
			roll: function(args) {
				var opt = defaults(args);
				var fn = function() {
					$("#" + opt.id).find("ul:first").animate({
						"margin-top": "-0.5rem"
					},
					2000,
					function() {
						$(this).css("margin-top", 0).find("li:first").appendTo(this)
					})
				};
				setInterval(fn, opt.delay)
			},
			loadDataFunction: "",
			isDataLoaded: false,
			isOver: "",
			documentHeight: "",
			loadDistance: 0,
			windowHeight: "",
			page: function(args) {
				var opt = defaults(args);
				var pageId = opt.id;
				info.loadDataFunction = opt.loadDataFunction;
				info.documentHeight = $(document).height();
				info.windowHeight = document.documentElement.clientHeight;
				init();
				function init() {
					var obj = document.getElementById("infinite-scroll-preloader-" + pageId);
					if (obj == null) {
						$("#" + pageId).after('<div id="infinite-scroll-preloader-' + pageId + '" class="infinite-scroll-preloader"></div>')
					}
					var oFooter = document.getElementById("footer");
					if (oFooter != null) {
						if ($("#footer").is(":visible") == true) {
							$("#infinite-scroll-preloader-" + pageId).css("margin-bottom", oFooter.offsetHeight + "px")
						}
					}
					info.loadDistance = Math.floor($("#infinite-scroll-preloader-" + pageId).height() * 1 / 3);
					$(window).on('scroll',
					function() {
						if (!info.isDataLoaded && info.isOver != pageId && (info.documentHeight - info.loadDistance) <= (info.windowHeight + $(window).scrollTop())) {
							info.loadDown()
						}
					});
					info.autoLoad(pageId)
				}
			},
			over: function(pageId) {
				info.isOver = pageId
			},
			autoLoad: function(pageId) {
				if ((info.documentHeight - info.loadDistance) <= info.windowHeight) {
					info.loadDown(pageId)
				}
			},
			loadDown: function(pageId) {
				$("#infinite-scroll-preloader-" + pageId).html('<span class="preloader"></span>正在加载...');
				info.isDataLoaded = true;
				info.loadDataFunction()
			},
			resetLoad: function(pageId) {
				info.documentHeight = $(document).height();
				info.isDataLoaded = false;
				if (info.isOver == pageId) {
					$("#infinite-scroll-preloader-" + pageId).html('<div class="no-data">已无更多数据</div>')
				} else {
					info.autoLoad()
				}
			},
			tab: function(args) {
				var opt = defaults(args);
				var tabId = opt.id;
				var current = opt.current;
				$("#" + tabId + " ul").append('<b class="border"></b>');
				var tabNum = $("#" + tabId + " ul li").length;
				$("#" + tabId + " ul li").css("width", (100 / tabNum) + "%");
				$("#" + tabId + " ul .border").css("width", (100 / tabNum) + "%");
				$("#" + tabId + " ul li").each(function(i) {
					if (i == (current - 1)) {
						$(this).addClass("current");
						$("#" + tabId + " .border").css("left", $(this).offset().left + "px")
					}
				});
				$(".tab-content>div").each(function(i) {
					if (i == (current - 1)) {
						$(this).css("display", "block")
					} else {
						$(this).css("display", "none")
					}
				});
				opt.callback({
					"index": current
				});
				$("#" + tabId + " ul li").click(function() {
					$(this).addClass("current").siblings().removeClass("current");
					$("#" + tabId + " .border").css("left", $(this).offset().left + "px");
					$(".tab-content>div:eq(" + $(this).index() + ")").show().siblings().hide();
					opt.callback({
						"index": $(this).index() + 1
					})
				})
			},
			date: function(args) {
				var opt = defaults(args);
				var dateId = opt.id;
				var now = new Date();
				var yearList = '';
				for (var i = 1900; i <= parseInt(now.getFullYear() + 50); i++) {
					yearList += '<li class="date-li date-show">' + i + '</li>'
				}
				var monthList = '';
				for (var i = 1; i <= 12; i++) {
					if (i < 10) {
						i = "0" + i
					}
					monthList += '<li class="date-li date-show">' + i + '</li>'
				}
				var dayList = '';
				for (var i = 1; i <= 31; i++) {
					if (i < 10) {
						i = "0" + i
					}
					dayList += '<li class="date-li date-show">' + i + '</li>'
				}
				var dateHtml = '<div id="date-box-' + dateId + '" class="mask" style="display: none;">';
				dateHtml += '<div class="container">';
				dateHtml += '<div class="dialog animated fadeInUp">';
				dateHtml += '<div id="final-date-text-' + dateId + '" style="margin:0.1rem 0;"></div>';
				dateHtml += '<input type="hidden" id="final-date-value-' + dateId + '" value="" />';
				dateHtml += '<div class="dialog-content">';
				dateHtml += '<table style="width:100%;">';
				dateHtml += '<thead>';
				dateHtml += '<tr>';
				dateHtml += '<th style="width:34%;">年</th>';
				dateHtml += '<th style="width:33%;">月</th>';
				dateHtml += '<th style="width:33%;">日</th>';
				dateHtml += '</tr>';
				dateHtml += '</thead>';
				dateHtml += '<tbody>';
				dateHtml += '<tr>';
				dateHtml += '<td style="width:34%;">';
				dateHtml += '<div id="year-' + dateId + '" style="position:relative;height:5rem;overflow:hidden;">';
				dateHtml += '<ul class="date-ul" style="transform: translate(0px, 0px);transition: all 0.4s;">';
				dateHtml += '</ul>';
				dateHtml += '</div>';
				dateHtml += '</td>';
				dateHtml += '<td style="width:33%;position:relative;overflow:hidden;">';
				dateHtml += '<div id="month-' + dateId + '" style="position:relative;height:5rem;overflow:hidden;">';
				dateHtml += '<ul class="date-ul" style="transform: translate(0px, 0px);transition: all 0.4s;">';
				dateHtml += '</ul>';
				dateHtml += '</div>';
				dateHtml += '</td>';
				dateHtml += '<td style="width:33%;position:relative;overflow:hidden;">';
				dateHtml += '<div id="day-' + dateId + '" style="position:relative;height:5rem;overflow:hidden;">';
				dateHtml += '<ul class="date-ul" style="transform: translate(0px, 0px);transition: all 0.4s;">';
				dateHtml += '</ul>';
				dateHtml += '</div>';
				dateHtml += '</td>';
				dateHtml += '</tr>';
				dateHtml += '</tbody>';
				dateHtml += '</table>';
				dateHtml += '</div>';
				dateHtml += '<div class="dialog-button-container">';
				dateHtml += '<button id="date-cancel-' + dateId + '" class="button dialog-button">取消</button>';
				dateHtml += '<button id="date-ok-' + dateId + '" class="button dialog-button">确定</button>';
				dateHtml += '</div>';
				dateHtml += '</div>';
				dateHtml += '</div>';
				dateHtml += '</div>';
				$(document.body).append(dateHtml);
				$("#date-box-" + dateId + " table ul").after('<div class="mask-data"><div class="mask-up"></div><div class="mask-mid"></div><div class="mask-down"></div></div>');
				var isStart = true;
				var isMove = false;
				var isEnd = false;
				var startY = 0;
				var lastY = 0;
				var nowElement = null;
				var liLength = 0;
				var nY = 0;
				var mY = 0;
				var endY = 0;
				var maxY = 0;
				var minY = 0;
				var nowY = 0;
				var liHeight = $(".mask-mid").height();
				var year = "";
				var month = "";
				var day = "";
				var lastMoveTime = 0;
				var lastMoveStart = 0;
				var totalDistance = 0;
				var stopInertiaMove = false;
				init();
				if (opt.date == "" || opt.date == null || opt.date == undefined) {} else {
					close(true)
				}
				$("#" + dateId).bind("click",
				function() {
					init();
					$("#date-box-" + dateId).show();
					return
				});
				$("#date-ok-" + dateId).bind("click",
				function() {
					close(true);
					opt.callback({
						"date": $("#final-date-text-" + dateId).text()
					});
					return
				});
				$("#date-cancel-" + dateId).bind("click",
				function() {
					close();
					return
				});
				function init() {
					$("#year-" + dateId + " ul").empty();
					$("#month-" + dateId + " ul").empty();
					$("#day-" + dateId + " ul").empty();
					$("#year-" + dateId + " ul").html(yearList);
					$("#month-" + dateId + " ul").html(monthList);
					$("#day-" + dateId + " ul").html(dayList);
					var date = $("#final-date-value-" + dateId).val();
					if (date == "" || date == null || date == undefined) {
						if (opt.date == "" || opt.date == null || opt.date == undefined) {} else {
							var arr = opt.date.split("-");
							now = new Date(arr[0], arr[1] - 1, arr[2])
						}
					} else {
						var arr = date.split("-");
						now = new Date(arr[0], arr[1] - 1, arr[2])
					}
					year = now.getFullYear();
					month = ((now.getMonth() + 1) < 10 ? "0": "") + (now.getMonth() + 1);
					day = (now.getDate() < 10 ? "0": "") + now.getDate();
					var curMonthDays = new Date(year, month, 0).getDate();
					var dif = curMonthDays - 31;
					if (dif < 0) {
						var moveY = getTranslateY($("#day-" + dateId + " .date-ul"));
						for (var i = 0; i > dif; i--) {
							$("#day-" + dateId + " .date-ul > li:eq(" + [31 - 1 + i] + ")").removeClass("date-show").addClass("date-hide")
						}
					}
					$("#year-" + dateId + " .date-ul .date-li").each(function() {
						if (parseInt($(this).text()) == parseInt(year)) {
							var positionY = -($(this).index() - 2) * liHeight;
							$(this).parent().css("transform", "translate(0, " + positionY + "px)")
						}
					});
					$("#month-" + dateId + " .date-ul .date-li").each(function() {
						if (parseInt($(this).text()) == parseInt(month)) {
							var positionY = -($(this).index() - 2) * liHeight;
							$(this).parent().css("transform", "translate(0, " + positionY + "px)")
						}
					});
					$("#day-" + dateId + " .date-ul .date-li").each(function() {
						if (parseInt($(this).text()) == parseInt(day)) {
							var positionY = -($(this).index() - 2) * liHeight;
							$(this).parent().css("transform", "translate(0, " + positionY + "px)")
						}
					});
					$("#final-date-text-" + dateId).html(year + "-" + month + "-" + day)
				}
				var oScrollList = document.querySelectorAll("#date-box-" + dateId + " .mask-data");
				for (var i = 0; i < oScrollList.length; i++) {
					oScrollList[i].addEventListener("touchstart",
					function(event) {
						event.preventDefault();
						startY = event.touches[0].clientY;
						lastY = startY;
						nowElement = $(this).prev(".date-ul");
						liLength = nowElement.find(".date-show").length;
						nY = getTranslateY(nowElement);
						if (!isMove && isEnd) {
							return false
						}
						isStart = false;
						isMove = false;
						lastMoveStart = lastY;
						lastMoveTime = new Date().getTime();
						stopInertiaMove = true
					},
					false);
					oScrollList[i].addEventListener("touchmove",
					function(event) {
						event.preventDefault();
						mY = event.touches[0].clientY;
						if (!isStart) {
							isMove = true;
							isEnd = true
						}
						if (isMove) {
							nowElement.css("transition", "none");
							nowElement.css("transform", "translate(0, " + -(nY - (mY - startY)) + "px)")
						}
						var nowTime = new Date().getTime();
						stopInertiaMove = true;
						if ((nowTime - lastMoveTime) > 300) {
							lastMoveTime = nowTime;
							lastMoveStart = mY
						}
					},
					false);
					oScrollList[i].addEventListener("touchend",
					function(event) {
						event.preventDefault();
						endY = event.changedTouches[0].clientY;
						maxY = liHeight * 2;
						minY = -(liLength - 3) * liHeight;
						if (isEnd) {
							isMove = false;
							isEnd = false;
							isStart = true;
							nY = -(nY - (mY - startY));
							nowY = endY;
							if (nY > maxY) {
								nowElement.css("transition", "all .5s");
								nowElement.css("transform", "translate(0, " + maxY + "px)")
							} else if (nY < minY) {
								nowElement.css("transition", "all .5s");
								nowElement.css("transform", "translate(0, " + minY + "px)")
							} else {
								var endTime = new Date().getTime();
								var v = (nowY - lastMoveStart) / (endTime - lastMoveTime);
								stopInertiaMove = false; (function(v, lastMoveTime, contentY) {
									var dir = v > 0 ? -1 : 1;
									var deceleration = dir * 0.0006;
									function inertiaMove() {
										if (stopInertiaMove) {
											return
										}
										var nowTime = new Date().getTime();
										var t = nowTime - lastMoveTime;
										var nowV = v + t * deceleration;
										var moveY = (v + nowV) / 2 * t;
										if (dir * nowV > 0) {
											if (totalDistance > maxY) {
												nowElement.css("transition", "all .5s");
												nowElement.css("transform", "translate(0, " + maxY + "px)")
											} else if (totalDistance < minY) {
												nowElement.css("transition", "all .5s");
												nowElement.css("transform", "translate(0, " + minY + "px)")
											} else {
												nowElement.css("transition", "all .5s");
												nowElement.css("transform", "translate(0, " + Math.round(totalDistance / liHeight) * liHeight + "px)")
											}
											setTimeout(function() {
												fillDate(nowElement.parent().attr("id"))
											},
											500);
											return
										}
										totalDistance = contentY + moveY;
										if (totalDistance > (maxY + (liHeight * 2))) {
											nowElement.css("transition", "all .5s");
											nowElement.css("transform", "translate(0, " + maxY + "px)");
											return
										} else if (totalDistance < (minY - (liHeight * 2))) {
											nowElement.css("transition", "all .5s");
											nowElement.css("transform", "translate(0, " + minY + "px)");
											return
										}
										nowElement.css("transform", "translate(0, " + totalDistance + "px)");
										setTimeout(function() {
											fillDate()
										},
										500);
										setTimeout(inertiaMove, 10)
									}
									inertiaMove()
								})(v, endTime, nY)
							}
							setTimeout(function() {
								fillDate()
							},
							500)
						}
					},
					false)
				}
				function fillDate(id) {
					var currentY = 0;
					$("#date-box-" + dateId + " .date-ul").each(function(index) {
						currentY = getTranslateY(this);
						var value = "";
						if (currentY == 0) {
							value = $($(this).find(".date-li")[2]).text()
						} else {
							value = $($(this).find(".date-li")[Math.round(currentY / liHeight) + 2]).text()
						}
						if (index == 0) {
							year = value
						} else if (index == 1) {
							month = value
						} else if (index == 2) {
							day = value
						}
					});
					if (id != undefined && id != null) {
						if (id == "year-" + dateId || id == "month-" + dateId) {
							var curMonthDays = new Date(year, month, 0).getDate();
							var curDays = $("#day-" + dateId + " .date-ul .date-show").length;
							var dif = curMonthDays - curDays;
							if (dif > 0) {
								for (var i = 0; i < dif; i++) {
									$("#day-" + dateId + " .date-ul > li:eq(" + [curDays + i] + ")").removeClass("date-hide").addClass("date-show")
								}
							} else if (dif < 0) {
								var moveY = getTranslateY($("#day-" + dateId + " .date-ul"));
								for (var i = 0; i > dif; i--) {
									$("#day-" + dateId + " .date-ul > li:eq(" + [curDays - 1 + i] + ")").removeClass("date-show").addClass("date-hide")
								}
								if (moveY > (curMonthDays - 1 - 2) * liHeight) {
									$("#day-" + dateId + " .date-ul").css("transition", "all 0s");
									$("#day-" + dateId + " .date-ul").css("transform", "translate(0, " + -(curMonthDays - 1 - 2) * liHeight + "px)");
									day = curMonthDays
								}
							}
						}
					}
					$("#final-date-text-" + dateId).html(year + "-" + month + "-" + day);
					$("#final-date-value-" + dateId).val(year + "-" + month + "-" + day)
				}
				function getTranslateY(element) {
					var matrix = $(element).css("transform");
					var translateY = 0;
					if (matrix != "none") {
						var arr = matrix.split(",");
						translateY = -(arr[5].split(")")[0])
					}
					return translateY
				}
				function close(isOk) {
					if (isOk) {
						$("#final-date-value-" + dateId).val(year + "-" + month + "-" + day);
						var obj = document.getElementById(dateId);
						if (obj && obj.tagName == "INPUT") {
							$("#" + dateId).val($("#final-date-text-" + dateId).text())
						} else {
							$("#" + dateId).html($("#final-date-text-" + dateId).text())
						}
					}
					$("#date-box-" + dateId).css("display", "none")
				}
			},
			firstIndex: 0,
			lastIndex: 0,
			isSearchInit: false,
			select: function(args) {
				var opt = defaults(args);
				var selectId = opt.id;
				var obj = document.getElementById("input-" + selectId);
				if (obj == null) {
					$("#" + selectId).before('<input id="input-' + selectId + '" type="text" placeholder="点击选择" value="" readonly />')
				}
				$("#" + selectId).hide();
				var selectHtml = '<div id="select-box-' + selectId + '" class="mask" style="display: none;">';
				selectHtml += '<div class="container">';
				selectHtml += '<div class="dialog animated fadeInUp">';
				selectHtml += '<div class="search-input">';
				selectHtml += '<input type="text" id="search-' + selectId + '" placeholder="输入关键字...">';
				selectHtml += '<a href="javascript:;" class="icon" onclick="javaex.selectSearch(\'' + selectId + '\')"><span class="icon-search"></span></a>';
				selectHtml += '</div>';
				selectHtml += '<div class="dialog-content">';
				selectHtml += '<div id="opt-select-' + selectId + '" style="position:relative;height:5rem;overflow:hidden;">';
				selectHtml += '<ul class="select-ul" style="transform: translate(0px, 0px);transition: all 0.4s;">';
				selectHtml += '</ul>';
				selectHtml += '</div>';
				selectHtml += '</div>';
				selectHtml += '<div class="dialog-button-container">';
				selectHtml += '<button id="select-cancel-' + selectId + '" class="button dialog-button">取消</button>';
				selectHtml += '<button id="select-ok-' + selectId + '" class="button dialog-button">确定</button>';
				selectHtml += '</div>';
				selectHtml += '</div>';
				selectHtml += '</div>';
				selectHtml += '</div>';
				$(document.body).append(selectHtml);
				$("#select-box-" + selectId + " ul").after('<div id="mask-data-' + selectId + '" class="mask-data"><div class="mask-up"></div><div class="mask-mid"></div><div class="mask-down"></div></div>');
				var isStart = true;
				var isMove = false;
				var isEnd = false;
				var startY = 0;
				var lastY = 0;
				var nowElement = null;
				var liLength = 0;
				var nY = 0;
				var mY = 0;
				var endY = 0;
				var maxY = 0;
				var minY = 0;
				var nowY = 0;
				var liHeight = $(".mask-mid").height();
				var lastMoveTime = 0;
				var lastMoveStart = 0;
				var totalDistance = 0;
				var stopInertiaMove = false;
				var selectValue = $("#" + selectId).val();
				var selectName = "";
				init();
				close(true);
				$("#input-" + selectId).bind("click",
				function() {
					init();
					$("#select-box-" + selectId).show();
					return
				});
				$("#select-ok-" + selectId).bind("click",
				function() {
					close(true);
					return
				});
				$("#select-cancel-" + selectId).bind("click",
				function() {
					close();
					return
				});
				function init() {
					$("#opt-select-" + selectId + " ul").empty();
					$("#opt-select-" + selectId + " ul").html($("#" + selectId).html());
					$("#opt-select-" + selectId + " option").addClass("select-option option-show");
					$("#opt-select-" + selectId + " option").each(function() {
						if ($(this).attr("value") == selectValue) {
							var positionY = -($(this).index() - 2) * liHeight;
							$(this).parent().css("transform", "translate(0, " + positionY + "px)")
						}
					});
					selectName = $("#" + selectId).find("option:selected").text();
					info.firstIndex = 0;
					info.lastIndex = $("#opt-select-" + selectId + " ul option").length - 1
				}
				var oScroll = document.getElementById("mask-data-" + selectId);
				oScroll.addEventListener("touchstart",
				function(event) {
					event.preventDefault();
					startY = event.touches[0].clientY;
					lastY = startY;
					nowElement = $(this).prev(".select-ul");
					liLength = nowElement.find(".option-show").length;
					nY = getTranslateY(nowElement);
					if (!isMove && isEnd) {
						return false
					}
					isStart = false;
					isMove = false;
					lastMoveStart = lastY;
					lastMoveTime = new Date().getTime();
					stopInertiaMove = true
				},
				false);
				oScroll.addEventListener("touchmove",
				function(event) {
					event.preventDefault();
					mY = event.touches[0].clientY;
					if (!isStart) {
						isMove = true;
						isEnd = true
					}
					if (isMove) {
						nowElement.css("transition", "none");
						nowElement.css("transform", "translate(0, " + -(nY - (mY - startY)) + "px)")
					}
					var nowTime = new Date().getTime();
					stopInertiaMove = true;
					if ((nowTime - lastMoveTime) > 300) {
						lastMoveTime = nowTime;
						lastMoveStart = mY
					}
				},
				false);
				oScroll.addEventListener("touchend",
				function(event) {
					event.preventDefault();
					endY = event.changedTouches[0].clientY;
					maxY = -(info.firstIndex - 2) * liHeight;
					minY = -(info.lastIndex - 2) * liHeight;
					if (isEnd) {
						isMove = false;
						isEnd = false;
						isStart = true;
						nY = -(nY - (mY - startY));
						nowY = endY;
						if (nY > maxY) {
							nowElement.css("transition", "all .5s");
							nowElement.css("transform", "translate(0, " + maxY + "px)")
						} else if (nY < minY) {
							nowElement.css("transition", "all .5s");
							nowElement.css("transform", "translate(0, " + minY + "px)")
						} else {
							var endTime = new Date().getTime();
							var v = (nowY - lastMoveStart) / (endTime - lastMoveTime);
							stopInertiaMove = false; (function(v, lastMoveTime, contentY) {
								var dir = v > 0 ? -1 : 1;
								var deceleration = dir * 0.0006;
								function inertiaMove() {
									if (stopInertiaMove) {
										return
									}
									var nowTime = new Date().getTime();
									var t = nowTime - lastMoveTime;
									var nowV = v + t * deceleration;
									var moveY = (v + nowV) / 2 * t;
									if (dir * nowV > 0) {
										if (totalDistance > maxY) {
											nowElement.css("transition", "all .5s");
											nowElement.css("transform", "translate(0, " + maxY + "px)")
										} else if (totalDistance < minY) {
											nowElement.css("transition", "all .5s");
											nowElement.css("transform", "translate(0, " + minY + "px)")
										} else {
											nowElement.css("transition", "all .5s");
											nowElement.css("transform", "translate(0, " + Math.round(totalDistance / liHeight) * liHeight + "px)")
										}
										setTimeout(function() {
											setSelectValue()
										},
										500);
										return
									}
									totalDistance = contentY + moveY;
									if (totalDistance > (maxY + (liHeight * 2))) {
										nowElement.css("transition", "all .5s");
										nowElement.css("transform", "translate(0, " + maxY + "px)");
										return
									} else if (totalDistance < (minY - (liHeight * 2))) {
										nowElement.css("transition", "all .5s");
										nowElement.css("transform", "translate(0, " + minY + "px)");
										return
									}
									nowElement.css("transform", "translate(0, " + totalDistance + "px)");
									setTimeout(function() {
										setSelectValue()
									},
									500);
									setTimeout(inertiaMove, 10)
								}
								inertiaMove()
							})(v, endTime, nY)
						}
						setTimeout(function() {
							setSelectValue()
						},
						500)
					}
				},
				false);
				function getTranslateY(element) {
					var matrix = $(element).css("transform");
					var translateY = 0;
					if (matrix != "none") {
						var arr = matrix.split(",");
						translateY = -(arr[5].split(")")[0])
					}
					return translateY
				}
				function setSelectValue() {
					var currentY = 0;
					$("#opt-select-" + selectId + " .select-ul").each(function(index) {
						currentY = getTranslateY(this);
						var value = "";
						var name = "";
						if (currentY == 0) {
							value = $($(this).find(".select-option")[2]).attr("value");
							name = $($(this).find(".select-option")[2]).text()
						} else {
							value = $($(this).find(".select-option")[Math.round(currentY / liHeight) + 2]).attr("value");
							name = $($(this).find(".select-option")[Math.round(currentY / liHeight) + 2]).text()
						}
						if (index == 0) {
							selectValue = value;
							selectName = name
						}
						info.isSearchInit = false
					})
				}
				function close(isOk) {
					if (isOk) {
						if (info.isSearchInit) {
							selectValue = $($("#opt-select-" + selectId + " .select-ul").find(".select-option")[info.firstIndex]).attr("value");
							selectName = $($("#opt-select-" + selectId + " .select-ul").find(".select-option")[info.firstIndex]).text()
						}
						$("#" + selectId).val(selectValue);
						if (selectValue == "") {
							$("#input-" + selectId).val("")
						} else {
							$("#input-" + selectId).val(selectName)
						}
						opt.callback({
							"selectValue": selectValue,
							"selectName": selectName
						})
					}
					$("#select-box-" + selectId).css("display", "none")
				}
			},
			selectSearch: function(selectId) {
				var keyword = $("#search-" + selectId).val();
				var count = 0;
				var indexArr = new Array();
				keyword = keyword.replace(/(^\s*)|(\s*$)/g, "");
				if (keyword == "") {
					$("#opt-select-" + selectId + " ul option").removeClass("option-hide").addClass("option-show")
				} else {
					$("#opt-select-" + selectId + " ul option").each(function(i) {
						if ($(this).text().toLowerCase().indexOf(keyword.toLowerCase()) == -1) {
							$(this).removeClass("option-show").addClass("option-hide");
							count++
						} else {
							$(this).removeClass("option-hide").addClass("option-show");
							indexArr.push(i)
						}
					});
					if (indexArr != "" && indexArr != null) {
						$("#opt-select-" + selectId + " .select-ul").css("transition", "all 0s");
						var positionY = 0;
						var liHeight = $(".mask-mid").height();
						info.firstIndex = indexArr[0];
						info.lastIndex = indexArr[indexArr.length - 1];
						$("#opt-select-" + selectId + " .select-ul").css("transform", "translate(0, " + -(info.firstIndex - 2) * liHeight + "px)");
						info.isSearchInit = true
					}
				}
			}
		};
		return info
	};
	window.javaex = javaex()
})();