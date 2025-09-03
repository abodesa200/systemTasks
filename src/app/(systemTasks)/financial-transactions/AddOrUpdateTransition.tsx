import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { transactionCategories } from "./data";

export const TransactionForm = ({
  transaction,
  onChange,
  onSubmit,
  isEditing,
  onClose,
}) => (
  <div className="grid gap-4 py-4">
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="type">نوع المعاملة</Label>
        <Select
          value={transaction.type}
          onValueChange={(value) =>
            onChange({ ...transaction, type: value, category: "" })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="اختر النوع" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">إيراد</SelectItem>
            <SelectItem value="expense">مصروف</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">الفئة</Label>
        <Select
          value={transaction.category}
          onValueChange={(value) =>
            onChange({ ...transaction, category: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="اختر الفئة" />
          </SelectTrigger>
          <SelectContent>
            {transactionCategories[transaction.type].map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>

    <div className="space-y-2">
      <Label htmlFor="description">الوصف</Label>
      <Input
        id="description"
        placeholder="وصف المعاملة..."
        value={transaction.description}
        onChange={(e) =>
          onChange({ ...transaction, description: e.target.value })
        }
      />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="amount">المبلغ (ر.س)</Label>
        <Input
          id="amount"
          type="number"
          placeholder="0.00"
          value={transaction.amount}
          onChange={(e) => onChange({ ...transaction, amount: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">التاريخ</Label>
        <Input
          id="date"
          type="date"
          value={transaction.date}
          onChange={(e) => onChange({ ...transaction, date: e.target.value })}
        />
      </div>
    </div>

    <div className="space-y-2">
      <Label htmlFor="status">الحالة</Label>
      <Select
        value={transaction.status}
        onValueChange={(value) => onChange({ ...transaction, status: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="اختر الحالة" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="مكتمل">مكتمل</SelectItem>
          <SelectItem value="معلق">معلق</SelectItem>
          <SelectItem value="ملغى">ملغى</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <DialogFooter className="mt-4">
      <DialogClose asChild>
        <Button variant="outline" onClick={onClose}>
          إلغاء
        </Button>
      </DialogClose>
      <Button onClick={onSubmit}>
        {isEditing ? "تحديث المعاملة" : "إضافة معاملة"}
      </Button>
    </DialogFooter>
  </div>
);
