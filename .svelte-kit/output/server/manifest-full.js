export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "personalportfolio/_app",
	assets: new Set([".DS_Store",".nojekyll","fonts/Icon\r","fonts/PPKyoto-Extrabold.woff","fonts/PPKyoto-Extrabold.woff2","fonts/PPKyoto-ExtraboldItalic.woff","fonts/PPKyoto-ExtraboldItalic.woff2","fonts/PPKyoto-Heavy.woff","fonts/PPKyoto-Heavy.woff2","fonts/PPKyoto-HeavyItalic.woff","fonts/PPKyoto-HeavyItalic.woff2","fonts/PPKyoto-Light.woff","fonts/PPKyoto-Light.woff2","fonts/PPKyoto-LightItalic.woff","fonts/PPKyoto-LightItalic.woff2","fonts/PPKyoto-Medium.woff","fonts/PPKyoto-Medium.woff2","fonts/PPKyoto-MediumItalic.woff","fonts/PPKyoto-MediumItalic.woff2","fonts/PPKyoto-Regular.woff","fonts/PPKyoto-Regular.woff2","fonts/PPKyoto-RegularItalic.woff","fonts/PPKyoto-RegularItalic.woff2","fonts/PPKyoto-Thin.woff","fonts/PPKyoto-Thin.woff2","fonts/PPKyoto-ThinItalic.woff","fonts/PPKyoto-ThinItalic.woff2","freccia-dx.svg","freccia-sx.svg","media/.DS_Store","media/brand/favicon.jpg","media/brand/gumroad-1 (1).svg"]),
	mimeTypes: {".woff":"font/woff",".woff2":"font/woff2",".svg":"image/svg+xml",".jpg":"image/jpeg",".mp4":"video/mp4",".webp":"image/webp",".png":"image/png",".jpeg":"image/jpeg"},
	_: {
		client: {start:"_app/immutable/entry/start.TkhJpgpZ.js",app:"_app/immutable/entry/app.CUi77sIc.js",imports:["_app/immutable/entry/start.TkhJpgpZ.js","_app/immutable/chunks/C-gLAxc3.js","_app/immutable/chunks/CJuHBavL.js","_app/immutable/chunks/Cb9t86T3.js","_app/immutable/chunks/SghaoJdB.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/sAwDAjVN.js","_app/immutable/chunks/BE0rlgZa.js","_app/immutable/entry/app.CUi77sIc.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Cb9t86T3.js","_app/immutable/chunks/SghaoJdB.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CJuHBavL.js","_app/immutable/chunks/BezXv-9L.js","_app/immutable/chunks/BPx99VXY.js","_app/immutable/chunks/BRvhCpCp.js","_app/immutable/chunks/sAwDAjVN.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/bento",
				pattern: /^\/bento\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/projects/[slug]",
				pattern: /^\/projects\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/tools",
				pattern: /^\/tools\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/tools/asciify",
				pattern: /^\/tools\/asciify\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/tools/dithering",
				pattern: /^\/tools\/dithering\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/tools/[slug]",
				pattern: /^\/tools\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {"_app/immutable/assets/1.DFCNoCZp.mp4":2232276,"_app/immutable/assets/10.DeZo80O_.webp":199526,"_app/immutable/assets/11.DlGpuk2p.png":1092522,"_app/immutable/assets/12.BCpQnS9Z.png":1190894,"_app/immutable/assets/1_thumb.DZzeJ1tB.webp":434,"_app/immutable/assets/2.lpaHk86E.webp":40070,"_app/immutable/assets/3.AgKWlW2d.webp":32092,"_app/immutable/assets/4.BfvgrU0v.webp":101540,"_app/immutable/assets/5.BhpIyBpP.webp":108636,"_app/immutable/assets/6.fxAdRQ9p.webp":62130,"_app/immutable/assets/7.0C5CNLHP.webp":74104,"_app/immutable/assets/8.BZQRNHIp.webp":130512,"_app/immutable/assets/9.zP_7AYjt.jpeg":84560,"_app/immutable/assets/1.DZqvmZWG.mp4":2158785,"_app/immutable/assets/1_thumb.DmgF79-6.webp":9674,"_app/immutable/assets/2.BjZ6JwoJ.webp":65958,"_app/immutable/assets/3.Pq8dsEbj.webp":652322,"_app/immutable/assets/4.Bqer3OTc.jpeg":252346,"_app/immutable/assets/5.DXgSzj83.jpeg":314310,"_app/immutable/assets/6.DRFbyXbb.webp":17814,"_app/immutable/assets/7.BSg3Dfd0.webp":25534,"_app/immutable/assets/8.fd3lcaGU.webp":95392,"_app/immutable/assets/9.Ci0Ze1bj.webp":89830,"_app/immutable/assets/1.BQl92AUa.mp4":99865731,"_app/immutable/assets/10.CgBpDs0T.jpeg":140707,"_app/immutable/assets/11.DcMYuH_Z.webp":528302,"_app/immutable/assets/12.DK1Dajuy.webp":20986,"_app/immutable/assets/13.CF2QHxPW.webp":162414,"_app/immutable/assets/14.ChUMnTL-.jpeg":156207,"_app/immutable/assets/2.BSEfnShx.jpeg":236148,"_app/immutable/assets/3.U08uPGn2.jpeg":280453,"_app/immutable/assets/4.BNr_4Gnd.jpeg":142083,"_app/immutable/assets/5.Db7d23Ga.jpeg":124369,"_app/immutable/assets/6.w7G3jnZk.jpeg":281763,"_app/immutable/assets/7.C3xOj2wa.jpeg":140283,"_app/immutable/assets/8.Dg098rUK.webp":91180,"_app/immutable/assets/9.BTroS1AX.jpeg":295393,"_app/immutable/assets/1.BhoUKx4W.mp4":3728327,"_app/immutable/assets/10.C3Jv-kCi.jpeg":522067,"_app/immutable/assets/11.C5f0biVg.jpeg":632512,"_app/immutable/assets/1_thumb.Bs1-pBar.webp":2588,"_app/immutable/assets/2.V9M54Jzk.webp":1283594,"_app/immutable/assets/4.BhMkTmES.jpeg":101071,"_app/immutable/assets/5.D6p7_BHz.jpeg":108529,"_app/immutable/assets/6.DC9oXfEI.webp":897660,"_app/immutable/assets/7.Bn7eqZp0.webp":589656,"_app/immutable/assets/8.BTGOHV-G.jpeg":2505827,"_app/immutable/assets/9.BOEo8QtY.jpeg":200162,"_app/immutable/assets/1.Dcp0cPlO.mp4":11722266,"_app/immutable/assets/2.CUjUw_Na.jpeg":1810884,"_app/immutable/assets/3.D0Cp6Npo.jpeg":1925573,"_app/immutable/assets/4.C2KWGjhA.jpeg":1710206,"_app/immutable/assets/1.kC75hpB_.mp4":10985596,"_app/immutable/assets/10.BB0sNGEG.png":1721051,"_app/immutable/assets/11.c5AJqq7v.png":1735358,"_app/immutable/assets/12.XGXnCM_-.png":1827414,"_app/immutable/assets/13.OFTVCVZb.png":1707091,"_app/immutable/assets/14.BbnKOMzk.png":1010205,"_app/immutable/assets/4.0cAf0lIt.jpeg":353493,"_app/immutable/assets/5.D_AXwe4M.jpeg":302671,"_app/immutable/assets/6.Cs4AB7cG.png":922647,"_app/immutable/assets/7.B3pLOP9V.png":1251194,"_app/immutable/assets/8.BNkz7Qpf.png":1599167,"_app/immutable/assets/9.BywwvWGx.png":1656101,"_app/immutable/assets/1.DyBWdvmB.webp":781210,"_app/immutable/assets/2.FLUZ6Ol_.webp":81034,"_app/immutable/assets/1.DkzUDXjp.jpeg":183358,"_app/immutable/assets/2.phSgfB5l.jpeg":248441,"_app/immutable/assets/3.CtmZQj5_.jpeg":289758,"_app/immutable/assets/4.C8PxILzi.jpeg":277823,"_app/immutable/assets/5.DqcjoLHt.png":980202,"_app/immutable/assets/6.C2o197jN.png":2129938,"_app/immutable/assets/1.CFr9IW6_.mp4":68468113,"_app/immutable/assets/10.6KJr8tae.png":2795267,"_app/immutable/assets/11.CmKGaOD6.png":3159680,"_app/immutable/assets/2.8Q0DQ00r.png":3242285,"_app/immutable/assets/3.D4Rfnfmo.png":2578369,"_app/immutable/assets/4.DHcemTX7.jpeg":261227,"_app/immutable/assets/5.Cr9Bz2Tw.jpeg":370988,"_app/immutable/assets/6.DQ6Y_QIj.jpeg":497495,"_app/immutable/assets/7.BOlubnww.jpeg":749670,"_app/immutable/assets/8.myZdy_iN.png":3361506,"_app/immutable/assets/9.K4bViaNm.png":2837190,"_app/immutable/assets/1.C3n4CXwW.mp4":3991526,"_app/immutable/assets/1_thumb.CgdWSCSk.webp":10894,"_app/immutable/assets/2.BgMq7uPP.jpeg":163182,"_app/immutable/assets/3.CCV236i5.jpeg":284720,"_app/immutable/assets/4.DVZWyZ50.jpeg":391508,"_app/immutable/assets/5.aa-NM-IO.jpeg":299551,"_app/immutable/assets/6.DKSkrjZ1.jpeg":431901,"_app/immutable/assets/10.BJ732eCj.webp":11246,"_app/immutable/assets/11.B9wGJNZJ.webp":11782,"_app/immutable/assets/12.RKsKhQyH.webp":13060,"_app/immutable/assets/2.MhtcAQ15.webp":12092,"_app/immutable/assets/3.BJfC8j28.webp":9600,"_app/immutable/assets/4.BBMGBGfk.webp":23424,"_app/immutable/assets/5.BP_4FEYK.webp":28486,"_app/immutable/assets/6.BYNDIKTJ.webp":15230,"_app/immutable/assets/7.COnau0sN.webp":20278,"_app/immutable/assets/8.C_5QZkTH.webp":25752,"_app/immutable/assets/9.DA02q8g7.webp":8874,"_app/immutable/assets/2.gq_4KV2L.webp":6990,"_app/immutable/assets/3.D7IXLM7E.webp":16028,"_app/immutable/assets/4.DrcHQC0i.webp":25770,"_app/immutable/assets/5.DI3w_ctL.webp":13398,"_app/immutable/assets/6.KgXRnKhf.webp":2894,"_app/immutable/assets/7.CmoZVMBs.webp":4034,"_app/immutable/assets/8.CM9Kfz4D.webp":13586,"_app/immutable/assets/9.DF_LELuH.webp":8150,"_app/immutable/assets/10.DLYABZ-J.webp":11624,"_app/immutable/assets/11.DX3QzYqd.webp":16308,"_app/immutable/assets/12.-w0uREJ8.webp":2736,"_app/immutable/assets/13.P6Kvbtg2.webp":15598,"_app/immutable/assets/14.EJw_2IKC.webp":14134,"_app/immutable/assets/2.NVGf7Nc4.webp":9064,"_app/immutable/assets/3.H2_MWLvO.webp":13352,"_app/immutable/assets/4.BBObIUpn.webp":5672,"_app/immutable/assets/5.D3bA7xOx.webp":5090,"_app/immutable/assets/6.t9bCbkky.webp":13044,"_app/immutable/assets/7.dfRqn6av.webp":5602,"_app/immutable/assets/8.DCqNFz-X.webp":8958,"_app/immutable/assets/9.CtR2Sogu.webp":8428,"_app/immutable/assets/10.vBenwvQo.webp":4156,"_app/immutable/assets/11.BcbVD_iO.webp":6644,"_app/immutable/assets/2.Qf_MMr69.webp":17952,"_app/immutable/assets/4.CtMRHoaB.webp":32416,"_app/immutable/assets/5.D3fA2wP9.webp":34964,"_app/immutable/assets/6.BE7FSqts.webp":23338,"_app/immutable/assets/7.BCZdUX9t.webp":14526,"_app/immutable/assets/8.2nvramDI.webp":13242,"_app/immutable/assets/9.LPT3hA19.webp":11422,"_app/immutable/assets/2.C83OU1y-.webp":14072,"_app/immutable/assets/3.1Pq9D5qu.webp":12672,"_app/immutable/assets/4.DIuc9QbY.webp":9474,"_app/immutable/assets/10.WWMABKyt.webp":9494,"_app/immutable/assets/11.DvVV426Z.webp":8180,"_app/immutable/assets/12.B8Xq9Qxm.webp":10826,"_app/immutable/assets/13.CikEKwA3.webp":4542,"_app/immutable/assets/14.B-oeALVm.webp":1966,"_app/immutable/assets/4.BwhAlfvs.webp":12934,"_app/immutable/assets/5.PVMXZ3j2.webp":20326,"_app/immutable/assets/6.BIT8N4di.webp":2848,"_app/immutable/assets/7.DO4NynEL.webp":4644,"_app/immutable/assets/8.C-zSK2yH.webp":8778,"_app/immutable/assets/9.CKY4CB0f.webp":8612,"_app/immutable/assets/1.COf5zRTi.webp":8852,"_app/immutable/assets/2.DEvKK08O.webp":8940,"_app/immutable/assets/1.B_xaTTZ_.webp":17576,"_app/immutable/assets/2.CvrRY6Gz.webp":10880,"_app/immutable/assets/3.DlyG18G7.webp":5504,"_app/immutable/assets/4.oNSqGiW6.webp":5974,"_app/immutable/assets/5.Dc2nKDKw.webp":5910,"_app/immutable/assets/6.B1d1BaSQ.webp":12754,"_app/immutable/assets/10.DVfsi030.webp":12042,"_app/immutable/assets/11.CTouozBc.webp":12984,"_app/immutable/assets/2.Db5J7fId.webp":15242,"_app/immutable/assets/3.3tEjxoyU.webp":16734,"_app/immutable/assets/4.B_qXkIx9.webp":12730,"_app/immutable/assets/5.BKS9VacY.webp":15784,"_app/immutable/assets/6.BlqshltE.webp":30646,"_app/immutable/assets/7.8rY3FD7v.webp":35804,"_app/immutable/assets/8.oq9tt-5C.webp":20370,"_app/immutable/assets/9.BXwhOo3b.webp":22250,"_app/immutable/assets/2.DSo3Twog.webp":11180,"_app/immutable/assets/3.DDn97Kr_.webp":17192,"_app/immutable/assets/4.CGMPEOdJ.webp":21102,"_app/immutable/assets/5.CRh0ggtW.webp":19686,"_app/immutable/assets/6.CWztXa1H.webp":6384}
	}
}
})();
