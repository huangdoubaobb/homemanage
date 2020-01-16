/**
 * Created by liujie .
 */
/* jshint -W065,-W098 */

/* global BMap:false, basePath:false, ClassBase:false */
var _local = window.location;
var _contextPath = _local.pathname.split("/")[1];
var _basePath = _local.protocol + "//" + _local.host + "/" + _contextPath;
var TypeDefine = {

	'G_LINE' : {
		'default' : {
			"default" : {
				"12" : {
					strokeWeight : 1,
					strokeColor : 'red',
					enableMassClear : false
				},
				"16" : {
					strokeWeight : 1.5,
					strokeColor : 'red',
					enableMassClear : false
				},
				"18" : {
					strokeWeight : 2.5,
					strokeColor : 'red',
					enableMassClear : false
				}
			},
			"183" : {
				"12" : {
					strokeWeight : 1,
					strokeColor : 'red',
					enableMassClear : false
				},
				"16" : {
					strokeWeight : 1.5,
					strokeColor : 'red',
					enableMassClear : false
				},
				"18" : {
					strokeWeight : 2.5,
					strokeColor : 'red',
					enableMassClear : false
				}
			},
			"211" : {
				"12" : {
					strokeWeight : 1,
					strokeColor : 'red',
					enableMassClear : false
				},
				"16" : {
					strokeWeight : 1.5,
					strokeColor : 'red',
					enableMassClear : false
				},
				"18" : {
					strokeWeight : 2.5,
					strokeColor : 'red',
					enableMassClear : false
				}
			},
			"193" : {
				"12" : {
					strokeWeight : 1,
					strokeColor : 'red',
					strokeStyle : "dashed",
					enableMassClear : false
				},
				"16" : {
					strokeWeight : 1.5,
					strokeColor : 'red',
					strokeStyle : "dashed",
					enableMassClear : false
				},
				"18" : {
					strokeWeight : 2.5,
					strokeColor : 'red',
					strokeStyle : "dashed",
					enableMassClear : false
				}
			}
		}
	},
	'G_SD_LINE' : {
		'default' : {
			"default" : {
				"12" : {
					strokeWeight : 1,
					strokeColor : 'green',
					enableMassClear : false
				},
				"16" : {
					strokeWeight : 1.5,
					strokeColor : 'green',
					enableMassClear : false
				},
				"18" : {
					strokeWeight : 2.5,
					strokeColor : 'green',
					enableMassClear : false
				}
			},
			"35000" : {
				"12" : {
					strokeWeight : 1,
					strokeColor : '#008B00',
					enableMassClear : false
				},
				"16" : {
					strokeWeight : 1.5,
					strokeColor : '#008B00',
					enableMassClear : false
				},
				"18" : {
					strokeWeight : 2.5,
					strokeColor : '#008B00',
					enableMassClear : false
				}
			},
			"110000" : {
				"12" : {
					strokeWeight : 1,
					strokeColor : '#0000AA',
					enableMassClear : false
				},
				"16" : {
					strokeWeight : 1.5,
					strokeColor : '#0000AA',
					enableMassClear : false
				},
				"18" : {
					strokeWeight : 2.5,
					strokeColor : '#0000AA',
					enableMassClear : false
				}
			},
			"220000" : {
				"12" : {
					strokeWeight : 1,
					strokeColor : '#CD0000',
					// strokeStyle : "dashed",
					enableMassClear : false
				},
				"16" : {
					strokeWeight : 1.5,
					strokeColor : '#CD0000',
					// strokeStyle : "dashed",
					enableMassClear : false
				},
				"18" : {
					strokeWeight : 2.5,
					strokeColor : '#CD0000',
					// strokeStyle : "dashed",
					enableMassClear : false
				}
			},
			"500000" : {
				"12" : {
					strokeWeight : 1,
					strokeColor : '#CD00CD',
					// strokeStyle : "dashed",
					enableMassClear : false
				},
				"16" : {
					strokeWeight : 1.5,
					strokeColor : '#CD00CD',
					// strokeStyle : "dashed",
					enableMassClear : false
				},
				"18" : {
					strokeWeight : 2.5,
					strokeColor : '#CD00CD',
					// strokeStyle : "dashed",
					enableMassClear : false
				}
			}
		}
	},
	'G_POLE' : {
		'default' : {
			"default" : {
				"12" : {
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/002_ZXTG_520_16x16.png",
							new BMap.Size(16, 16)),
					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"16" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/002_ZXTG_520_16x16.png",
							new BMap.Size(16, 16)),

					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"18" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/002_直线砼杆_520_32x32.png",
							new BMap.Size(32, 32)),
					enableMassClear : false,
					rotation : "",
					title : ""
				}
			},
			"520" : {
				"12" : {
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/002_ZXTG_520_16x16.png",
							new BMap.Size(16, 16)),
					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"16" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/002_ZXTG_520_16x16.png",
							new BMap.Size(16, 16)),

					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"18" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/002_直线砼杆_520_32x32.png",
							new BMap.Size(32, 32)),
					enableMassClear : false,
					rotation : "",
					title : ""
				}
			},
			"539" : {
				"12" : {
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/002_耐张钢管_539_16x16.png",
							new BMap.Size(16, 16)),
					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"16" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/002_耐张钢管_539_16x16.png",
							new BMap.Size(16, 16)),
					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"18" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/002_耐张钢管_539_32x32.png",
							new BMap.Size(32, 32)),
					enableMassClear : false,
					rotation : "",
					title : ""
				}
			},
			"538" : {
				"12" : {
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/002_耐张铁塔_538_16x16.png",
							new BMap.Size(16, 16)),
					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"16" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/002_耐张铁塔_538_16x16.png",
							new BMap.Size(16, 16)),
					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"18" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/002_耐张铁塔_538_32x32.png",
							new BMap.Size(32, 32)),
					enableMassClear : false,
					rotation : "",
					title : ""
				}
			},
			"536" : {
				"12" : {
					icon : new BMap.Icon(_basePath
							+ "/js/libs/BMap/lib/symbol/002_铁塔_536_16x16.png",
							new BMap.Size(16, 16)),
					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"16" : {
					offset : "",
					icon : new BMap.Icon(_basePath
							+ "/js/libs/BMap/lib/symbol/002_铁塔_536_16x16.png",
							new BMap.Size(16, 16)),

					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"18" : {
					offset : "",
					icon : new BMap.Icon(_basePath
							+ "/js/libs/BMap/lib/symbol/002_铁塔_536_32x32.png",
							new BMap.Size(32, 32)),
					enableMassClear : false,
					rotation : "",
					title : ""
				}
			},
			"512" : {
				"12" : {
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/002_直线钢管_512_16x16.png",
							new BMap.Size(16, 16)),
					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"16" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/002_直线钢管_512_32x32.png",
							new BMap.Size(32, 32)),
					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"18" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/002_直线钢管_512_64x64.png",
							new BMap.Size(64, 64)),
					enableMassClear : false,
					rotation : "",
					title : ""
				}
			}
		}
	},
	'G_SD_POLE' : {
		'default' : {
			"default" : {
				"12" : {
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/20002_输电铁塔_500_16x16.png",
							new BMap.Size(16, 16)),
					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"16" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/20002_输电铁塔_500_16x16.png",
							new BMap.Size(16, 16)),

					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"18" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/20002_输电铁塔_500_32x32.png",
							new BMap.Size(32, 32)),
					enableMassClear : false,
					rotation : "",
					title : ""
				}
			},
			"500" : {
				"12" : {
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/20002_输电铁塔_500_16x16.png",
							new BMap.Size(16, 16)),
					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"16" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/20002_输电铁塔_500_16x16.png",
							new BMap.Size(16, 16)),

					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"18" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/20002_输电铁塔_500_32x32.png",
							new BMap.Size(32, 32)),
					enableMassClear : false,
					rotation : "",
					title : ""
				}
			}
		}
	},
	'G_SD_BDZ' : {
		'default' : {
			"default" : {
				"12" : {
					icon : new BMap.Icon(
							_basePath
							+ "/js/libs/BMap/lib/symbol/007_ZYBDS_1792_32x22.png",
							new BMap.Size(32, 22)),
							enableMassClear : false,
							rotation : "",
							title : ""
				},
				"16" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
							+ "/js/libs/BMap/lib/symbol/007_ZYBDS_1792_32x22.png",
							new BMap.Size(32, 22)),
							enableMassClear : false,
							rotation : "",
							title : ""
				},
				"18" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
							+ "/js/libs/BMap/lib/symbol/007_ZYBDS_1792_32x22.png",
							new BMap.Size(32, 22)),
							enableMassClear : false,
							rotation : "",
							title : ""
				}
			},
			"500000" : {
				"12" : {
					icon : new BMap.Icon(
							_basePath
							+ "/js/libs/BMap/lib/symbol/007_ZYBDS_1792_32x22.png",
							new BMap.Size(32, 22)),
							enableMassClear : false,
							rotation : "",
							title : ""
				},
				"16" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
							+ "/js/libs/BMap/lib/symbol/007_ZYBDS_1792_32x22.png",
							new BMap.Size(32, 22)),
							enableMassClear : false,
							rotation : "",
							title : ""
				},
				"18" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
							+ "/js/libs/BMap/lib/symbol/007_ZYBDS_1792_32x22.png",
							new BMap.Size(32, 22)),
							enableMassClear : false,
							rotation : "",
							title : ""
				}
			},
			"220000" : {
				"12" : {
					icon : new BMap.Icon(
							_basePath
							+ "/js/libs/BMap/lib/symbol/007_ZYBDS_1792_32x22.png",
							new BMap.Size(32, 22)),
							enableMassClear : false,
							rotation : "",
							title : ""
				},
				"16" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
							+ "/js/libs/BMap/lib/symbol/007_ZYBDS_1792_32x22.png",
							new BMap.Size(32, 22)),
							enableMassClear : false,
							rotation : "",
							title : ""
				},
				"18" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
							+ "/js/libs/BMap/lib/symbol/007_ZYBDS_1792_32x22.png",
							new BMap.Size(32, 22)),
							enableMassClear : false,
							rotation : "",
							title : ""
				}
			},
			"110000" : {
				"12" : {
					icon : new BMap.Icon(
							_basePath
							+ "/js/libs/BMap/lib/symbol/007_ZYBDS_1792_32x22.png",
							new BMap.Size(32, 22)),
							enableMassClear : false,
							rotation : "",
							title : ""
				},
				"16" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
							+ "/js/libs/BMap/lib/symbol/007_ZYBDS_1792_32x22.png",
							new BMap.Size(32, 22)),
							enableMassClear : false,
							rotation : "",
							title : ""
				},
				"18" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
							+ "/js/libs/BMap/lib/symbol/007_ZYBDS_1792_32x22.png",
							new BMap.Size(32, 22)),
							enableMassClear : false,
							rotation : "",
							title : ""
				}
			},
			"35000" : {
				"12" : {
					icon : new BMap.Icon(
							_basePath
							+ "/js/libs/BMap/lib/symbol/007_ZYBDS_1792_32x22.png",
							new BMap.Size(32, 22)),
							enableMassClear : false,
							rotation : "",
							title : ""
				},
				"16" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
							+ "/js/libs/BMap/lib/symbol/007_ZYBDS_1792_32x22.png",
							new BMap.Size(32, 22)),
							enableMassClear : false,
							rotation : "",
							title : ""
				},
				"18" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
							+ "/js/libs/BMap/lib/symbol/007_ZYBDS_1792_32x22.png",
							new BMap.Size(32, 22)),
							enableMassClear : false,
							rotation : "",
							title : ""
				}
			}
		}
	},
	'G_CONTAINER' : {
		'default' : {
			"7" : {
				"12" : {
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/007_中压变电所_1792_16x11.png",
							new BMap.Size(16, 11)),
					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"16" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/007_中压变电所_1792_32x22.png",
							new BMap.Size(32, 22)),
					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"18" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/007_中压变电所_1792_64x44.png",
							new BMap.Size(64, 44)),
					enableMassClear : false,
					rotation : "",
					title : ""
				}
			},
			"8" : {
				"12" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/008_箱式变_2048_16x11.png",
							new BMap.Size(16, 11)),
					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"16" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/008_箱式变_2048_32x22.png",
							new BMap.Size(32, 22)),
					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"18" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/008_箱式变_2048_64x43.png",
							new BMap.Size(64, 43)),
					enableMassClear : false,
					rotation : "",
					title : ""
				}
			},
			"9" : {
				"12" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/009_专用变压器_2384_16x10.png",
							new BMap.Size(16, 11)),
					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"16" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/009_专用变压器_2384_32x20.png",
							new BMap.Size(32, 22)),
					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"18" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/009_专用变压器_2384_64x39.png",
							new BMap.Size(64, 43)),
					enableMassClear : false,
					rotation : "",
					title : ""
				}
			},
			"10" : {
				"12" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/010_环网柜_2560_16x11.png",
							new BMap.Size(16, 14)),
					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"16" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/010_环网柜_2560_32x22.png",
							new BMap.Size(32, 27)),
					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"18" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/010_环网柜_2560_64x43.png",
							new BMap.Size(64, 54)),
					enableMassClear : false,
					rotation : "",
					title : ""
				}
			},
			"11" : {
				"12" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/011_配电所_2816_16x11.png",
							new BMap.Size(16, 11)),
					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"16" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/011_配电所_2816_32x22.png",
							new BMap.Size(32, 22)),
					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"18" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/011_配电所_2816_64x44.png",
							new BMap.Size(64, 44)),
					enableMassClear : false,
					rotation : "",
					title : ""
				}
			},
			"18" : {
				"12" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/018_电缆分支箱_4608_16x11.png",
							new BMap.Size(16, 11)),
					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"16" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/018_电缆分支箱_4608_32x22.png",
							new BMap.Size(32, 22)),
					enableMassClear : false,
					rotation : "",
					title : ""
				},
				"18" : {
					offset : "",
					icon : new BMap.Icon(
							_basePath
									+ "/js/libs/BMap/lib/symbol/018_电缆分支箱_4608_64x44.png",
							new BMap.Size(64, 44)),
					enableMassClear : false,
					rotation : "",
					title : ""
				}
			}
		}
	}
};
