---
id: "04"
title: "จากส่วนแบ่งตลาด สู่อำนาจเหนือตลาด"
pageStart: 13
pageEnd: 14
---

## ภาพรวม

โมดูลนี้ชี้ให้เห็นว่าส่วนแบ่งตลาด (market share) เพียงอย่างเดียวไม่เพียงพอต่อการวัดอำนาจเหนือตลาด (market power) ในเศรษฐกิจดิจิทัล เพราะปัจจัยอย่างผลกระทบเครือข่าย ต้นทุนการย้ายค่าย และพฤติกรรมการใช้หลายแพลตฟอร์มพร้อมกันของผู้ใช้ ล้วนมีผลต่ออำนาจต่อรองที่แท้จริงของแพลตฟอร์มในตลาด

## สาระสำคัญจากสไลด์

สไลด์เปรียบเทียบแพลตฟอร์มสมมติ 2 ราย คือ Platform A ซึ่งมีส่วนแบ่งตลาด 60% และ Platform B ซึ่งมีส่วนแบ่งตลาดเพียง 40% โดยเปรียบเทียบปัจจัยที่เกี่ยวข้องกับอำนาจเหนือตลาด ดังนี้ (สไลด์ น. 14)

| ปัจจัย | Platform A (60%) | Platform B (40%) |
|---|---|---|
| ผลกระทบเครือข่าย (Network Effects) | ต่ำ | สูง |
| ต้นทุนการย้ายค่าย (Switching Costs) | ต่ำ | สูง |
| พฤติกรรมการใช้หลายแพลตฟอร์ม (Multi-homing) | ใช้หลายแพลตฟอร์มได้ง่าย | มักใช้แพลตฟอร์มเดียว (single-homing) |

Platform A มีส่วนแบ่งตลาดสูงกว่าแต่ผู้ใช้มีทางเลือกมาก สามารถย้ายไปใช้แพลตฟอร์มอื่นได้ง่าย (low switching costs, multi-homing easy) ทำให้ยังมีการแข่งขันค่อนข้างสูง ส่วน Platform B แม้มีส่วนแบ่งตลาดน้อยกว่า แต่มีผลกระทบเครือข่ายรุนแรง ต้นทุนการย้ายค่ายสูง และผู้ใช้มักใช้เพียงแพลตฟอร์มเดียว (single-homing) ทำให้ผู้ใช้พึ่งพาแพลตฟอร์มสูงและมีอุปสรรคในการย้ายค่าย สไลด์สรุปว่า **Platform B มีแนวโน้มมีอำนาจเหนือตลาดมากกว่า แม้จะมีส่วนแบ่งตลาดน้อยกว่า** เนื่องจากผลกระทบเครือข่าย ต้นทุนการย้ายค่ายที่สูง และพฤติกรรม single-homing ของผู้ใช้ (สไลด์ น. 14)

ที่มาของอำนาจเหนือตลาดในตลาดดิจิทัลตามสไลด์ เกิดจากวงจร: ผู้ใช้มากขึ้น (more users) → ข้อมูลมากขึ้น (more data) → อัลกอริทึมดีขึ้น (better algorithm) → บริการดีขึ้น (better service) → ดึงดูดผู้ใช้มากขึ้น (more users) ซึ่งวนกลับไปเสริมความได้เปรียบเดิม โดยมีปัจจัยเสริมคือต้นทุนการย้ายค่าย ภาวะล็อกอิน พฤติกรรม single-homing การกำหนดค่าเริ่มต้นและข้อจำกัดการทำงานร่วมกัน (defaults & interoperability) การประหยัดต่อขนาด/ขอบเขต และระบบนิเวศ (สไลด์ น. 14, ที่มา: European University Institute)

<svg viewBox="0 0 640 220" role="img" aria-label="แผนภาพเปรียบเทียบ Platform A และ Platform B" style="width:100%;height:auto;">
  <g font-family="var(--font-display)" font-size="13" fill="var(--color-ink)">
    <text x="130" y="20" text-anchor="middle" font-weight="700" fill="var(--color-accent)">Platform A</text>
    <text x="490" y="20" text-anchor="middle" font-weight="700" fill="var(--color-accent)">Platform B</text>

    <text x="20" y="55" font-size="12">ส่วนแบ่งตลาด</text>
    <rect x="130" y="42" width="180" height="18" fill="var(--color-accent-soft)"></rect>
    <rect x="130" y="42" width="108" height="18" fill="var(--color-accent)"></rect>
    <text x="320" y="56" font-size="12">60%</text>

    <rect x="400" y="42" width="180" height="18" fill="var(--color-accent-soft)"></rect>
    <rect x="400" y="42" width="72" height="18" fill="var(--color-accent)"></rect>
    <text x="590" y="56" font-size="12">40%</text>

    <text x="20" y="100" font-size="12">ผลกระทบเครือข่าย</text>
    <text x="220" y="100" font-size="12" text-anchor="middle">ต่ำ</text>
    <text x="490" y="100" font-size="12" text-anchor="middle" fill="var(--color-ext-ink)">สูง</text>

    <text x="20" y="135" font-size="12">ต้นทุนการย้ายค่าย</text>
    <text x="220" y="135" font-size="12" text-anchor="middle">ต่ำ</text>
    <text x="490" y="135" font-size="12" text-anchor="middle" fill="var(--color-ext-ink)">สูง</text>

    <text x="20" y="170" font-size="12">พฤติกรรมผู้ใช้</text>
    <text x="220" y="170" font-size="12" text-anchor="middle">Multi-homing</text>
    <text x="490" y="170" font-size="12" text-anchor="middle" fill="var(--color-ext-ink)">Single-homing</text>

    <text x="320" y="205" text-anchor="middle" font-size="12" font-weight="600" fill="var(--color-ext-ink)">สรุป: Platform B มีแนวโน้มมีอำนาจเหนือตลาดมากกว่า</text>
  </g>
</svg>

## แนวคิดและศัพท์สำคัญ

- **Market power (อำนาจเหนือตลาด)** — ความสามารถของผู้ประกอบธุรกิจในการกำหนดราคาหรือเงื่อนไขการค้าโดยไม่ถูกจำกัดจากแรงกดดันของคู่แข่งอย่างมีนัยสำคัญ ต่างจาก market share ที่เป็นเพียงตัวชี้วัดเชิงปริมาณ (สไลด์ น. 13, 14)
- **Switching costs (ต้นทุนการย้ายค่าย)** — ต้นทุนที่ผู้ใช้ต้องแบกรับหากเปลี่ยนไปใช้แพลตฟอร์มอื่น (สไลด์ น. 14)
- **Multi-homing / Single-homing** — พฤติกรรมที่ผู้ใช้ใช้งานหลายแพลตฟอร์มพร้อมกัน (multi-homing) หรือใช้เพียงแพลตฟอร์มเดียว (single-homing) (สไลด์ น. 14)
- **Lock-in (ภาวะล็อกอิน)** — สภาวะที่ผู้ใช้ถูกผูกไว้กับแพลตฟอร์มจนยากจะย้ายออก (สไลด์ น. 14)
</content>
