// // Load the full build.

// import Zibal from "./zibal";



// // Initialize with configurations
// Zibal.init({
// 	merchant: 'YOUR-MERCHANT-ID',
// 	callbackUrl: 'https://some-callback-url.tld',
// 	logLevel: 2
// 	// 0: none (default in production)
// 	// 1: error
// 	// 2: error + info (default)
// });

// // Payment Request
// Zibal.request(1500)
// 	.then((result) => {
// 		console.log(result);
// 		// { trackId: 1533727744287, result: 100, message: 'success', statusMessage: 'با موفقیت تایید شد.' }
// 	}).catch((err) => {
// 		console.error(err);
// 		// { result: 103, message: 'authentication error', statusMessage: '{merchant} غیرفعال' }
// 	});

// // Payment Start URL
// const url = Zibal.startURL(1533727744287);
// // >> then open url in browser

// // Payment Verify
// Zibal.verify(1533727744287)
// 	.then((result) => {
// 		console.log(result);
// 		// { paidAt: '2018-03-25T23:43:01.053000', amount: 1600, result: 100, status: 1, message : 'success', statusMessage: 'با موفقیت تایید شد.' }
// 	}).catch((err) => {
// 		console.error(err);
// 		// { result: 103, message: 'authentication error', statusMessage: '{merchant} غیرفعال' }
// 	});