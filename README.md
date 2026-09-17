# Asst.tigtoger

## Deploy แบบไม่ต้องเขียนโค้ดเพิ่ม

โปรเจกต์นี้เตรียม `render.yaml` ไว้แล้วสำหรับ Deploy บน Render โดยหน้าเว็บและ API จะอยู่โดเมนเดียวกัน

1. เปิด https://dashboard.render.com/
2. สมัครหรือเข้าสู่ระบบด้วย GitHub
3. กด **New +** แล้วเลือก **Blueprint**
4. เลือก repository `chanthirasarai-ship-it/asst.tigtoger..`
5. กด **Apply**
6. รอจนสถานะเป็น **Live**
7. เปิด URL ที่ Render แสดงให้

ทดสอบระบบด้วย URL เหล่านี้:

- `/api/health`
- `/api/trends`
- `/api/health/database`

ตัวอย่าง:

```text
https://ชื่อบริการ.onrender.com/api/health
```

## ค่าที่ต้องตั้งเมื่อจะเปิดใช้ TikTok และการชำระเงินจริง

ยังไม่ต้องใส่ตอนเริ่มต้นก็ได้ ระบบหน้าเว็บและ API พื้นฐานจะทำงานโดยไม่ใช้ค่าเหล่านี้

- `TIKTOK_CLIENT_KEY`
- `TIKTOK_CLIENT_SECRET`
- `TIKTOK_REDIRECT_URL`
- `STRIPE_SECRET_KEY` หรือ `OMISE_PUBLIC_KEY`

ห้ามส่งค่า Secret ในแชตหรือ commit ลง GitHub

## รันในเครื่อง

```bash
npm install
npm start
```

จากนั้นเปิด `http://localhost:3000`
