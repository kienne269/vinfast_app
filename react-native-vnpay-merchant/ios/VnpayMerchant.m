#import "VnpayMerchant.h"
#import <CallAppSDK/CallAppInterface.h>

@interface VnpayMerchant()

@property (nonatomic, strong) UIWindow *window1;

@end

@implementation VnpayMerchant

RCT_EXPORT_MODULE();
- (NSArray<NSString *> *)supportedEvents {
    return @[@"PaymentBack"];
}
RCT_EXPORT_METHOD(show:(NSString *)scheme 
                  isSandbox:(BOOL )isSandbox
                  paymentUrl:(NSString *)paymentUrl
                  tmn_code:(NSString *)tmn_code
                  backAlert:(NSString *)backAlert
                  title:(NSString *)title
                  titleColor:(NSString *)titleColor
                  beginColor:(NSString *)beginColor
                  endColor:(NSString *)endColor
                  iconBackName:(NSString *)iconBackName
                  )
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(sdkAction:) name:@"SDK_COMPLETED" object:nil];
        
        CGFloat width = [UIScreen mainScreen].bounds.size.width;
        CGFloat height = [UIScreen mainScreen].bounds.size.height;
        
        self.window1 = [[UIWindow alloc] initWithFrame:CGRectMake(0, 0, width, height)];
        self.window1.backgroundColor = UIColor.clearColor;
        self.window1.windowLevel = UIWindowLevelAlert;
        self.window1.rootViewController = [[UIViewController alloc] init];
        self.window1.rootViewController.view.backgroundColor = UIColor.clearColor;
        [self.window1 makeKeyAndVisible];
        
        [CallAppInterface setHomeViewController:self.window1.rootViewController];
        [CallAppInterface setSchemes:scheme];
        [CallAppInterface setEnableBackAction:YES];
        [CallAppInterface setIsSandbox:isSandbox];
        [CallAppInterface setAppBackAlert:backAlert];
        [CallAppInterface showPushPaymentwithPaymentURL:paymentUrl
                                              withTitle:title
                                           iconBackName:iconBackName
                                             beginColor:beginColor
                                               endColor:endColor
                                             titleColor:titleColor
                                               tmn_code:tmn_code];
    });
}



-(void)sdkAction:(NSNotification*)notification {
    if ([notification.name isEqualToString:@"SDK_COMPLETED"]){
        self.window1.hidden = YES;
        self.window1 = nil;
        
		//L??u ??: 
				//- Action d?????i ????y ???????c SDK tr??? v??? khi load ???????c c??c URL t????ng ???ng.
				//- Th???c hi???n cho lu???ng Thanh to??n qua ATM-T??i kho???n-Th??? qu???c t???. Merchant chuy???n h?????ng ?????n c??c URL m???c ?????nh t??? Return URL. SDK s??? ????ng l???i v?? tr??? v??? action cho ????n v??? k???t n???i ??i???u h?????ng v??? ???ng d???ng TMDT
				//* WebBackAction: http://cancel.sdk.merchantbackapp
				//* FaildBackAction: http://fail.sdk.merchantbackapp
				//* SuccessBackAction: http://success.sdk.merchantbackapp
				
        NSString *actionValue=[notification.object valueForKey:@"Action"];
        if ([@"AppBackAction" isEqualToString:actionValue]) {
            //Ng?????i d??ng nh???n back t??? sdk ????? quay l???i
            [self sendEventWithName:@"PaymentBack" body:@{@"resultCode":@-1}];
            return;
        }
        if ([@"CallMobileBankingApp" isEqualToString:actionValue]) {
            //Ng?????i d??ng nh???n ch???n thanh to??n qua app thanh to??n (Mobile Banking, V??...)
			//l??c n??y app t??ch h???p s??? c???n l??u l???i m?? giao d???ch thanh to??n (vnp_TxnRef). Khi ng?????i d??ng m??? l???i app t??ch h???p v???i cheme s??? g???i ki???m tra tr???ng th??i thanh to??n c???a m?? TxnRef . Ki???m tra tr???ng th??i thanh to??n c???a giao d???ch ????? th???c hi???n nghi???p v??? k???t th??c thanh to??n / th??ng b??o k???t qu??? cho kh??ch h??ng..
            [self sendEventWithName:@"PaymentBack" body:@{@"resultCode":@10}];
            return;
        }
        if ([@"WebBackAction" isEqualToString:actionValue]) {
            //Ki???m tra m?? l???i thanh to??n VNPAY ph???n h???i tr??n Return URL. T??? Return URL c???a ????n v??? k???t n???i th???c hi???n chuy???n h?????ng ??i URL: http://cancel.sdk.merchantbackapp
			// vnp_ResponseCode == 24 / Kh??ch h??ng h???y thanh to??n.
            [self sendEventWithName:@"PaymentBack" body:@{@"resultCode":@99}];
            return;
        }
        if ([@"FaildBackAction" isEqualToString:actionValue]) {
            //Ki???m tra m?? l???i thanh to??n VNPAY ph???n h???i tr??n Return URL. T??? Return URL c???a ????n v??? k???t n???i th???c hi???n chuy???n h?????ng ??i URL: http://fail.sdk.merchantbackapp 
			// vnp_ResponseCode != 00 / Giao d???ch thanh to??n kh??ng th??nh c??ng
            [self sendEventWithName:@"PaymentBack" body:@{@"resultCode":@98}];
            return;
        }
        if ([@"SuccessBackAction" isEqualToString:actionValue]) {
            //Ki???m tra m?? l???i thanh to??n VNPAY ph???n h???i tr??n Return URL. T??? Return URL c???a ????n v??? k???t n???i th???c hi???n chuy???n h?????ng ??i URL: http://success.sdk.merchantbackapp
			//vnp_ResponseCode == 00) / Giao d???ch th??nh c??ng
            [self sendEventWithName:@"PaymentBack" body:@{@"resultCode":@97}];
            return;
        }
    }
}
@end
