# PROGRESS.md

อ่าน BRIEF.md ก่อนเสมอ แล้วดูสถานะล่าสุดด้านล่างนี้เพื่อทำต่อ

## สถานะ: เฟส 0 เสร็จ → กำลังเริ่มเฟส 1

### เฟส 0 — เตรียมงาน ✅
- สร้าง BRIEF.md (คำสั่งต้นฉบับคำต่อคำ), CLAUDE.md, QUESTIONS.md, PROGRESS.md, .gitignore
- git init แล้ว
- ดึงข้อความ+ภาพ 100dpi จาก PDF ทั้ง 3 ไฟล์ลง work/ ด้วย work/extract.py
  - main_pages/ 25 หน้า (สไลด์หลัก), opening_pages/ 2 หน้า, schedule_pages/ 1 หน้า
  - main_text.txt, opening_text.txt, schedule_text.txt (ตัวคั่น `[[น. X]]`)
- ดูภาพทุกหน้าของสไลด์หลัก (25 หน้า) แล้ว — เป็นอินโฟกราฟิกเกือบทั้งหมด สรุปเนื้อหาแต่ละหน้าไว้ในหัวด้านล่าง (ใช้ทำ OUTLINE.md เฟส 1)

### สรุปเนื้อหารายหน้า (สไลด์หลัก 25 หน้า) ที่ตรวจจากภาพแล้ว
- น.1 ปก Digital Market / "WHEN THE MARKET BECOMES THE RULE MAKER"
- น.2 หัวข้อ "THE DIGITAL ECONOMY CHANGED COMPETITION"
- น.3 อินโฟกราฟิก มูลค่า E-Commerce ไทย 2563-2567 (ที่มา ETDA, สนง.สถิติแห่งชาติ)
- น.4 อินโฟกราฟิก ส่วนแบ่งตลาด E-Marketplace ไทย (Shopee/Lazada/TikTok) 2563-2568 (ที่มา กขค./Thai PBS Policy Watch/Momentum Works)
- น.5 หัวข้อ "IS THIS PLATFORM MERELY COMPETING... GOVERNING THE MARKET?"
- น.6 อินโฟกราฟิก ตลาด On-Demand Food Delivery ไทย 2566-2568 (Grab/LINE MAN/ShopeeFood/foodpanda) (ที่มา Momentum Works, Maybank IBG)
- น.7 อินโฟกราฟิก "จากห่วงโซ่เดิม สู่โลกแพลตฟอร์ม" Traditional Market vs Digital Platform
- น.8 อินโฟกราฟิก "ความแตกต่างของตลาดดั้งเดิมและตลาดดิจิทัล" ตาราง 7 มิติ + ผลกระทบต่อการแข่งขัน (Source: European University Institute)
- น.9 หัวข้อ "FINDING THE MARKET"
- น.10 อินโฟกราฟิก "ปลาใหญ่ในบ่อเล็ก vs ปลาเล็กในบ่อใหญ่" Market Definition (Source: EUI)
- น.11 อินโฟกราฟิก "ปัญหาราคาศูนย์บาท" Zero-Price Problem + Multi-sided platforms + ตัวอย่าง NYT/Airbnb/eBay (Source: EUI)
- น.12 อินโฟกราฟิก "การทำ Market Study ในตลาด E-Commerce" 6 ขั้นตอน
- น.13 หัวข้อ "FROM MARKET SHARE TO MARKET POWER"
- น.14 อินโฟกราฟิก "ใครมีอำนาจเหนือตลาดมากกว่า" Platform A (60% share, network effect ต่ำ) vs B (40% share, network effect สูง) (Source: EUI)
- น.15 หัวข้อ "FROM MARKET POWER TO THEORY OF HARM" / "Having power is not illegal — abusing it may be"
- น.16 อินโฟกราฟิก "Two Broad Theories of Harm": Exploitative abuses vs Exclusionary abuses + ตัวอย่าง (Self-preferencing, Tying, Pay-to-play)
- น.17 หัวข้อ "Vertical Restraints in Digital Distribution"
- น.18 อินโฟกราฟิก Vertical Restraint: Potential Efficiency vs Potential Harm, Intra-brand vs Inter-brand (Source: EUI)
- น.19 หัวข้อ "Can Algorithms Collude?"
- น.20 อินโฟกราฟิก "4 รูปแบบพฤติกรรมมิชอบในยุคอัลกอริทึม" ตามกรอบ Ezrachi & Stucke (2017); Manzini (2019): Messenger / Hub-and-Spoke / Predictable Agent / Digital Eye
- น.21 หัวข้อ "THE THAI COMPETITION LAW"
- น.22 อินโฟกราฟิก "ปัญหาการแข่งขันทางการค้า" ตาม พ.ร.บ.แข่งขันทางการค้า มาตรา 50 / 51-53 / 54&55 / 57
- น.23 อินโฟกราฟิก "Digital Mergers & Future Competition" (Competitive Elimination vs Accumulation, Reverse Killer Acquisitions, Acquisitions for Sleep, Kill Zones) (Source: EUI)
- น.24 "ตัวอย่างคดีในไทย — ฟังในคลาสเท่านั้น" **ไม่มีเนื้อหาให้ถอด** → บันทึกใน QUESTIONS.md แล้ว
- น.25 Thank You / ติดต่อ กขค.

### เอกสารเสริม
- สไลด์เปิด (opening) น.1: ปก + ชื่อวิทยากร "คุณมนยศ วรรธนะภูติ รองเลขาธิการคณะกรรมการการแข่งขันทางการค้า" วันที่ 28 ต.ค. 2569 ห้อง 424 ป๋วยอึ๊งภากรณ์
- สไลด์เปิด น.2: ประวัติวิทยากร (ตรี เศรษฐศาสตร์ มธ., โท เศรษฐศาสตร์ มธ., โท Finance and Investment, Univ. of Exeter UK)
- กำหนดการ น.1: วิชา ศ.483 (ใช้ตามที่ระบุในเอกสาร แม้ brief จะเขียนว่า EC483), หัวข้อ "การกำกับดูแลการแข่งขันในยุคดิจิทัล", 28 ต.ค. 2569 13.00-16.30 คณะเศรษฐศาสตร์ มธ. ศูนย์รังสิต

### ข้อสังเกตสำคัญสำหรับเฟสถัดไป
- reference/assets/css และ reference/assets/js เป็นโฟลเดอร์ว่าง (ไม่มีไฟล์จริง) — ต้องเขียน CSS/JS ใหม่ทั้งหมดเองตามฟังก์ชันที่ระบุใน brief (sticky TOC, ในบทนี้, scroll-margin, search/filter) ไม่ใช่ copy จาก reference
- สไลด์หลักเน้นแนวคิด/กรอบทฤษฎีเป็นภาษาอังกฤษ (หัวข้อ section) สลับกับอินโฟกราฟิกภาษาไทยที่มีข้อมูลตัวเลขจริงจากแหล่งอ้างอิง (ETDA, สนง.สถิติแห่งชาติ, กขค., Momentum Works, Maybank IBG, European University Institute, Ezrachi & Stucke) — ข้อมูลเหล่านี้ที่มาจากสไลด์เอง (มีป้ายกำกับในสไลด์แล้ว) ยังถือเป็น "เนื้อหาจากสไลด์" ไม่ใช่ข้อมูลเสริมภายนอกที่เราเพิ่มเอง

## ต่อไป: เฟส 1 — สร้าง OUTLINE.md แบ่งโมดูลตามโครงสไลด์จริง

### เฟส 1 ✅ — OUTLINE.md (8 โมดูล 00-07) เสร็จแล้ว

### เฟส 2 ✅ — เนื้อหาโมดูลจากสไลด์
- เขียน content/modules/00-intro.md ถึง 07-thai-law-mergers.md ครบ 8 ไฟล์ ทุกย่อหน้าจากสไลด์มีป้าย (สไลด์ น. X)
- มี inline SVG diagram ใน module 01, 02, 03, 04, 05, 06 (ใช้ CSS var ที่ยังต้องกำหนดใน style.css เฟส 4: --color-accent, --color-accent-soft, --color-accent-ink, --color-ext-ink, --color-ink, --color-rule, --font-display, --font-mono)
- เขียน VERIFICATION.md ตรวจตัวเลข/ชื่อเฉพาะทุกหน้าที่อ้างอิงกับภาพ 100dpi แล้ว — ไม่พบข้อผิดพลาด
- **สำคัญ**: reference/assets/ มีไฟล์ CSS/JS จริงที่ใช้งานได้ (ไม่ใช่โฟลเดอร์ว่างอย่างที่เข้าใจผิดตอนแรก) จะใช้เป็นต้นแบบฟังก์ชันในเฟส 4

## ต่อไป: เฟส 3 — กล่องข้อมูลเสริมภายนอก + glossary.json + quiz.json

### เฟส 3 ✅
- แทรกกล่อง "ข้อมูลเสริมภายนอก" 5 กล่อง (≤12 ตามกฎ) ใน modules 01, 02, 04, 05, 07 — ทุกกล่องมี WebSearch/WebFetch จริง + แหล่ง + ลิงก์ + "ข้อมูล ณ 27 ตุลาคม 2569" และกล่อง M04/M07 ชี้ความต่างระหว่างกรอบเศรษฐศาสตร์ในสไลด์กับเกณฑ์ตัวเลขตามกฎหมายไทยอย่างชัดเจน (ไม่ขัดกัน แต่คนละวิธีคิด)
  - M01: DPS Act ไทย (ETDA)
  - M02: EU DMA gatekeepers (European Commission)
  - M04: เกณฑ์ "ผู้มีอำนาจเหนือตลาด" ตามกฎหมายไทย (กขค. มาตรา 50)
  - M05: DMA มาตรา 6(5) ห้าม self-preferencing (CERRE/EU)
  - M07: เกณฑ์ตัวเลขการรวมธุรกิจตามกฎหมายไทย (กขค. มาตรา 51)
- content/glossary.json: 31 คำศัพท์ (29 จากสไลด์ + 2 จากภายนอก ติดป้าย tag)
- content/quiz.json: 36 ข้อ (4-5 ข้อ/โมดูล x 8 โมดูล) ผสม mcq/short พร้อมเฉลย+เหตุผลอ้างหน้าสไลด์ ข้อที่มาจากภายนอกติด tag "external" (4 ข้อ)

## ต่อไป: เฟส 4 — สร้างเว็บ (index.html, module.html, quiz.html, glossary.html, assets/)
</content>
