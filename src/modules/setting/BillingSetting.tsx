import { CreditCard, Download } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';

const BillingSetting = () => {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="">
        <CardTitle className="text-2xl text-indigo-800 flex items-center">
          <CreditCard className="h-5 w-5 ml-1" />
          الفواتير
        </CardTitle>
        <CardDescription>إدارة خطتك وطرق الدفع والفواتير</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">الخطة الحالية</h3>
          <div className="rounded-lg border p-4 ">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">الخطة الأساسية</p>
                <p className="text-sm text-gray-600">
                  تجديد تلقائي في 15 مايو 2024
                </p>
              </div>
              <Button variant="outline">ترقية الخطة</Button>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">طرق الدفع</h3>
          <div className="rounded-lg border p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-gray-100 p-2 rounded-md mr-3">
                  <CreditCard className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">بطاقة Visa تنتهي بـ 1234</p>
                  <p className="text-sm text-gray-600">تنتهي في 12/2024</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                تعديل
              </Button>
            </div>
          </div>

          <Button variant="outline" className="flex items-center">
            <CreditCard className="h-4 w-4 ml-1" />
            إضافة طريقة دفع جديدة
          </Button>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">سجل الفواتير</h3>
          <div className="rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">
                    التاريخ
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">
                    المبلغ
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">
                    الحالة
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">
                    التحميل
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-3 px-4 text-sm">15 أبريل 2024</td>
                  <td className="py-3 px-4 text-sm">99.00 ر.س</td>
                  <td className="py-3 px-4 text-sm">
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      مدفوعة
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm">15 مارس 2024</td>
                  <td className="py-3 px-4 text-sm">99.00 ر.س</td>
                  <td className="py-3 px-4 text-sm">
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      مدفوعة
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default BillingSetting