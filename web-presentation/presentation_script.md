# KỊCH BẢN THUYẾT TRÌNH — TÍNH TOÁN BẤT ĐỒNG BỘ
**Nhóm 4 — Đại diện: Nguyễn Ngọc Sơn — Tổng: 21 slide**

---

## SLIDE 1 — Giới thiệu Nhóm (team-intro)

**Lời nói:**
"Xin chào Cô và các bạn. Mình là Sơn, đại diện cho Nhóm 4. Qua các nội dung trước, chúng ta đã đi qua bức tranh khái quát về Tính toán Song song và Phân tán, cũng như cách triển khai dựa trên Đa luồng và Đa tiến trình. Hôm nay, Nhóm 4 sẽ trình bày về chủ đề **Tính toán Bất đồng bộ**. Trước khi vào nội dung chính, mình xin giới thiệu nhanh các thành viên đã cùng thực hiện báo cáo này."

*(Dừng 3-5 giây để khán giả nhìn poster, rồi bấm sang slide tiếp.)*

---

## SLIDE 2 — 1.1 Synchronous & Asynchronous (part1-intro)
> Sơ đồ Timeline: Sync (10s) vs Async (6s)

**Lời nói:**
"Để bắt đầu, chúng ta phân biệt 2 mô hình: **Đồng bộ** và **Bất đồng bộ**.

Tưởng tượng bạn phải: Nấu thịt kho, quét nhà, rửa bát.
- **Đồng bộ:** Bắc nồi thịt lên, đứng khoanh tay đợi 30 phút cho chín. Chín xong mới quét nhà, rửa bát. Rất lãng phí.
- **Bất đồng bộ:** Bắc nồi thịt lên, biết nó cần thời gian tự sôi, bạn tranh thủ đi quét nhà, rửa bát. Quay lại nồi thịt vừa chín.

Nhìn sơ đồ: Cách Đồng bộ mất **10 giây** vì CPU đứng chờ I/O. Cách Bất đồng bộ chỉ mất **6 giây** vì trong lúc chờ, CPU tranh thủ chạy Task B."

---

## SLIDE 3 — 1.2 So sánh kiến trúc (part1-architecture-compare)
> Bảng so sánh 3 cột: Tuần tự / Song song / Bất đồng bộ

**Lời nói:**
"Slide này so sánh tổng quan 3 mô hình. Điểm chú ý:
- Hàng 'Khi gặp I/O': Tuần tự đóng băng toàn bộ. Song song chỉ luồng con chờ. Bất đồng bộ **tự nguyện nhường quyền** cho Task khác.
- Hàng 'Bộ điều phối': Song song dùng OS Scheduler (nặng), Bất đồng bộ dùng **Event Loop** ở tầng ứng dụng (nhẹ)."

> **📋 Q&A liên quan — Câu 7:** "Concurrent cũng là bất đồng bộ phải không?"
> → "Concurrency là khái niệm MẸ. Cả Threading, Processing và Asyncio đều là công cụ để đạt Concurrency. Khác biệt: Threading bị OS ép buộc ngắt ngang (Preemptive), Asyncio tự nguyện nhường (Cooperative). Chi phí: Thread tốn vài MB RAM mỗi luồng, Asyncio Task chỉ tốn 2-4KB."

---

## SLIDE 4 — 1.3 Trạng thái CPU: Busy vs Idle (part1-cpu-states)
> Biểu đồ thanh: Lập trình tuần tự (lãng phí) vs Bất đồng bộ (tối ưu)

**Lời nói:**
"CPU chỉ có 2 trạng thái: **Busy** hoặc **Idle**. Mục tiêu tối thượng là giữ CPU luôn Busy.

Biểu đồ trên: phần đỏ 'IDLE - Chờ Mạng' chiếm 60% thời gian — CPU đang lãng phí.
Biểu đồ dưới: trong lúc chờ mạng, CPU tranh thủ chạy Task 2, 3. Tổng giảm từ 10s xuống 5s.

**Bản chất của Tính toán Bất đồng bộ là nghệ thuật triệt tiêu thời gian Idle.**"

---

## SLIDE 5 — 2.1 Bản chất & Thành phần cốt lõi (part1-asyncio-theory)
> 3 thành phần + Ẩn dụ Cửa hàng Thức ăn nhanh

**Lời nói:**
"Asyncio có 3 thành phần cốt lõi:
1. **Event Loop** — Vòng lặp sự kiện, quét liên tục xem Task nào sẵn sàng.
2. **Coroutine** — Hàm `async def`, có thể tạm dừng khi gặp `await`.
3. **Task / Future** — Lớp bọc Coroutine, như tờ biên lai chứa kết quả tương lai.

Ẩn dụ bên phải: Event Loop giống Quản lý quầy Order — nhận đơn xong lập tức quay sang khách tiếp, không đứng nhìn bếp nấu. Lò vi sóng = I/O chạy ngầm. Thẻ rung = Future."

> **📋 Q&A liên quan — Câu 8:** "Asyncio nhẹ hơn Thread thế nào?"
> → "Thread tốn 1-8MB RAM cho Thread Stack. 10.000 Thread ngốn 10-80GB. Asyncio Task chỉ là object Python tí hon, tầm 2-4KB. 10.000 Task chỉ tốn 40MB — chưa bằng 1 tab Chrome. Thread giống xe tải, Asyncio Task giống xe đạp."

---

## SLIDE 6 — 2.2 Lập trình Hướng sự kiện (part1-asyncio-event-driven)
> Ẩn dụ Fast Food: Event Loop / Main Thread / Event Queue

**Lời nói:**
"Asyncio dùng kiến trúc **Event-Driven**. Gồm 3 thành phần:
- **Nguồn sự kiện:** Click chuột, mạng gửi gói tin, ổ cứng đọc xong.
- **Hàng đợi sự kiện (Event Queue):** Xếp hàng để xử lý lần lượt.
- **Event Handler:** Hàm được gọi khi sự kiện rút khỏi hàng đợi.

**Luật vàng:** Nếu Handler chứa mã blocking quá lâu, nó sẽ đóng băng toàn bộ Event Queue!"

> **📋 Q&A liên quan — Câu 13:** "Event-Driven là gì, liên quan thế nào?"
> → "Nếu 'Đồng thời' và 'Bất đồng bộ' là ĐÍCH ĐẾN, thì Event-Driven là CÁCH THỨC. Event Loop ngồi 'trực tổng đài', khi có sự kiện nổ ra mới bốc code xử lý. Không có sự kiện thì ngồi chơi tiết kiệm CPU."

> **📋 Q&A liên quan — Câu 15:** "Nếu 1 hàm blocking lọt vào Event Loop?"
> → "THẢM HỌA! Event Loop bị treo cứng. 10.000 user đứng hình, rớt kết nối. Đây là điểm yếu chí mạng: 1 tác vụ sai giết chết toàn bộ hệ thống. Giải pháp: ném code blocking sang `run_in_executor()`."

---

## SLIDE 7 — 2.3 Cơ chế Event Loop (part1-event-loop)
> Mô phỏng tương tác: Nút "Thêm Task Nhanh" + "Thêm Task Chậm"

**Lời nói:**
"Mình demo trực tiếp:
1. Task vào **Task Queue**.
2. Event Loop chọn Task đầu tiên thực thi.
3. Gặp `await` → nhường quyền.
4. Event Loop lấy Task tiếp theo ngay lập tức.

*(Bấm 'Thêm Task Nhanh')* — Task CPU chạy xong nhanh.
*(Bấm 'Thêm Task Chậm')* — Task I/O chờ, nhưng Event Loop vẫn rảnh xử lý Task khác."

> **📋 Q&A liên quan — Câu 5:** "Khi Task hết chờ, được chạy ngay không?"
> → "KHÔNG! Phải quay lại xếp hàng trong Task Queue. Không được chen ngang. Event Loop xử lý xong đứa đang chạy dở rồi mới bốc tiếp. Đây là nguyên lý Cooperative Multitasking: đảm bảo công bằng, không ai bị ngắt ngang."

---

## SLIDE 8 — 2.4 Cú pháp async/await (part1-asyncio-syntax)
> 3 bước: Yield → Register → Resume

**Lời nói:**
"Khi gặp `await`, hệ thống làm 3 bước:
1. **Yield:** Coroutine tự nguyện trả quyền cho Event Loop.
2. **Register:** Event Loop ghi nhận 'Task đang chờ I/O, xong thì báo'.
3. **Resume:** I/O hoàn tất, Event Loop đánh thức Coroutine chạy tiếp đúng chỗ dừng.

Toàn bộ diễn ra trên **1 luồng duy nhất**, không tạo Thread nào."

---

## SLIDE 9 — Asyncio nâng cao (part1-asyncio-advanced)

**Lời nói:**
"Asyncio cung cấp các công cụ nâng cao: `asyncio.gather()` tung nhiều Coroutine chạy đồng thời rồi gom kết quả. `asyncio.wait_for()` đặt Timeout tự động hủy. Đây là vũ khí kiểm soát luồng chạy chính xác."

> **📋 Q&A liên quan — Câu 14:** "Asyncio 1 luồng có Race Condition không?"
> → "CÓ! Dù 1 luồng, nhưng các Task nhảy qua nhảy lại qua `await`. Ví dụ: Task A đọc số dư 100k, gọi `await`, Task B nhảy vào sửa thành 50k. Task A tỉnh dậy ghi đè → sai dữ liệu! Giải pháp: dùng `asyncio.Lock()` ở vùng nhạy cảm."

> **📋 Q&A liên quan — Câu 17:** "Dùng create_task() mà quên await?"
> → "Task VẪN CHẠY ngầm (Fire and Forget), nhưng rủi ro: Lỗi bị nuốt im lặng, và Garbage Collector có thể giết Task giữa chừng vì mất tham chiếu. Python khuyến cáo phải lưu Task vào Set để giữ mạng sống."

---

## SLIDE 10 — Patterns (part1-asyncio-patterns)

**Lời nói:**
"Các Pattern phổ biến: **Producer-Consumer** dùng `asyncio.Queue`, **Fan-out/Fan-in** dùng `gather`, **Pipeline** xử lý tuần tự. Tất cả xoay quanh triết lý: không bao giờ để CPU ngồi chờ."

> **📋 Q&A liên quan — Câu 18:** "Đồng bộ dữ liệu thế nào khi cái nào xong trước?"
> → "Dùng 3 vũ khí: `asyncio.Lock()` — như ổ khóa, ai vào trước khóa lại. `asyncio.Queue()` [khuyên dùng] — Task ném kết quả vào Queue, Master gom theo FIFO. `asyncio.Semaphore()` — giới hạn số Task thao tác cùng lúc."

---

## SLIDE 11 — Mô phỏng Asyncio (part1-asyncio-simulation)
> Dashboard mô phỏng Event Loop

**Lời nói:**
"Đây là Demo chính Asyncio. *(Bấm 'Bắn 10 Task')*

Quan sát: 10 Task ùa vào, Event Loop gắp từng Task. Gặp `await` → quăng sang 'Đang chờ', lấy Task mới. I/O trả về → nhét lại hàng đợi. Tất cả trên 1 luồng, không Thread nào, gánh vạn kết nối mà không ngốn RAM."

---

## SLIDE 12 — 3.1 concurrent.futures (part2-intro)
> ThreadPoolExecutor vs ProcessPoolExecutor + GIL

**Lời nói:**
"Asyncio yếu với CPU-bound và thư viện cũ. Lúc đó cần **`concurrent.futures`**:
1. **ThreadPoolExecutor:** Nhiều Thread. Tốt cho I/O, nhưng bị GIL kìm hãm.
2. **ProcessPoolExecutor:** Nhiều Process độc lập. Song song thực sự 100%.

Tại sao phân chia rõ? Vì **GIL** — sẽ giải thích ở slide sau."

> **📋 Q&A liên quan — Câu 9:** "Tại sao gọi concurrent.futures là 'bất đồng bộ'?"
> → "Sự bất đồng bộ nằm ở **Main Thread**: gọi `submit()`, không đứng chờ, nhận Future rồi đi làm tiếp. Nhưng các Worker bên dưới thì hoàn toàn tuần tự, ôm Task tới cùng. ThreadPool (3 Worker) chỉ tải 3 Task cùng lúc. Asyncio (1 Event Loop) tung cả 10 Task ra mạng cùng lúc!"

> **📋 Q&A liên quan — Câu 10:** "Tại sao vẫn dùng ThreadPool?"
> → "3 lý do: (1) Cứu tinh thư viện cũ blocking như `requests`, `pandas`. (2) Đọc/Ghi ổ cứng — Asyncio lúng túng với Disk I/O. (3) Đơn giản, code dễ debug."

---

## SLIDE 13 — 3.2 Vòng đời Future (part2-future-lifecycle)
> Sơ đồ: PENDING → RUNNING → DONE/CANCELLED

**Lời nói:**
"Gọi `submit()` → nhận **Future**. Có 4 trạng thái: PENDING → RUNNING → DONE hoặc CANCELLED.

Lưu ý: `result()` sẽ đóng băng luồng gọi nếu Task chưa xong. Dùng **Callback** để tránh."

> **📋 Q&A liên quan — Câu 1:** "100 Future, định danh và giải phóng sao?"
> → "Python gói Future trực tiếp vào `_WorkItem` cùng hàm và tham số. Worker mở gói ra, chạy, bỏ kết quả vào Future. Không cần tìm ID. Giải phóng: Reference Count = 0 → GC tự xóa đúng vùng nhớ, không nhầm."

> **📋 Q&A liên quan — Câu 2:** "Truyền 10 tham số vào submit()?"
> → "Cú pháp: `submit(fn, *args, **kwargs)`. 3 cách: truyền trực tiếp, keyword arguments, hoặc giải nén `*list` / `**dict`."

---

## SLIDE 14 — 3.3 ThreadPool vs ProcessPool (part2-thread-vs-process)
> Mô phỏng so sánh 2 bên

**Lời nói:**
"**ThreadPool:** Shared Memory, tạo nhanh, nhưng bị GIL.
**ProcessPool:** Isolated Memory, tạo chậm, tốn RAM, nhưng song song 100%.
Quy tắc: **I/O → Thread. CPU → Process.**"

---

## SLIDE 15 — 3.4 Khóa GIL (part2-gil)
> Mô phỏng 3 Threads tranh giành 1 khóa GIL

**Lời nói:**
"GIL — Global Interpreter Lock. Chỉ 1 Thread được chạy mã Python tại 1 thời điểm.
- **CPU-Bound:** Thread tranh GIL, thực tế chạy thay phiên, còn chậm hơn tuần tự.
- **I/O-Bound:** Thread tự nhả GIL khi chờ mạng → Thread khác nhảy vào → ThreadPool hiệu quả."

> **📋 Q&A liên quan — Câu 3:** "GIL nhường quyền ở I/O thế nào?"
> → "Chờ mạng không cần CPU. Python cho Thread tự nhả GIL. Thread 2 lập tức lấy GIL chạy. Khóa liên tục được nhường cho luồng có việc."

> **📋 Q&A liên quan — Câu 4:** "Thread có chạy song song thực sự không?"
> → "KHÔNG! Thread trong Python chỉ thay phiên nhau (Concurrency), tạo ảo giác song song. Cứ 5ms Python tước GIL chia luồng khác. Chỉ Process mới song song thực sự trên nhiều Core vật lý."

---

## SLIDE 16 — Super Dashboard (part2-super-dashboard)
> Bảng điều khiển mô phỏng ThreadPool

**Lời nói:**
"Demo chính concurrent.futures. *(Bấm chạy mô phỏng)*

Main Thread gọi `submit()` → tạo Future → đẩy Task vào Queue. Worker bốc Task xử lý. Xong → điền kết quả vào Future. Main Thread dùng `result()` hoặc Callback thu thập. Main Thread không bao giờ đứng chờ lúc `submit()`."

---

## SLIDE 17 — API Docs (part2-api-docs)

**Lời nói:**
"Tài liệu API tham khảo. 3 hàm quan trọng nhất:
- `submit(fn, *args)` — Giao việc, nhận Future.
- `as_completed(futures)` — Lặp theo thứ tự hoàn thành.
- `shutdown(wait=True)` — Đóng Pool, đợi xong.

Slide này như tờ cheat sheet để tra cứu."

---

## SLIDE 18 — 4.1 Khi Asyncio gặp Blocking (part3-intro)
> Đoạn code "Tự hủy" dùng requests.get() trong async

**Lời nói:**
"Phần 4 — kết nối tất cả lại.

Giả sử hệ thống Asyncio đang phục vụ 10.000 kết nối. Bạn gọi `requests.get()` — hàm Đồng bộ (Blocking), không biết nhường CPU. Event Loop đóng băng hoàn toàn — 10.000 user rớt kết nối!

Đoạn code màu đỏ trên slide là đoạn 'tự hủy diệt' mà lập trình viên rất hay mắc phải."

> **📋 Q&A liên quan — Câu 11:** "Tại sao Asyncio không xử lý Disk I/O như Network I/O?"
> → "Lỗi ở HĐH chứ không phải Asyncio! Network có Non-blocking sockets, HĐH trả lời 'chưa có data, về đi'. Nhưng Disk I/O: HĐH tước CPU luôn, bắt luồng ngủ sâu chờ ổ cứng quay. Asyncio bị đánh ngất, không kịp quăng Task. Giải pháp: dùng Thread phụ làm 'kẻ thế mạng'."

> **📋 Q&A liên quan — Câu 12:** "OS hiện đại đã sửa chưa?"
> → "Windows có IOCP từ lâu. Linux có io_uring từ 2019. Nhưng Python vẫn dùng ThreadPool vì phải Cross-platform — io_uring chỉ Linux, IOCP chỉ Windows. Python ưu tiên ổn định trên mọi máy."

---

## SLIDE 19 — 4.2 Cầu nối run_in_executor() (part3-code-example)
> Đoạn code chuẩn mực

**Lời nói:**
"Giải pháp duy nhất: **tống cổ hàm Blocking ra khỏi Event Loop**.

`run_in_executor()`: Event Loop gói hàm blocking, ném sang Worker Pool. Ngay lập tức quay về phục vụ 10.000 kết nối. Worker tải xong → bắn kết quả ngược lại qua `await`.

Đây là **kiến trúc Hybrid** — Đơn luồng Asyncio + Cơ bắp ThreadPool."

> **📋 Q&A liên quan — Câu 6:** "Asyncio kết hợp đa luồng/tiến trình được không?"
> → "Được! Dùng `run_in_executor()` hoặc `asyncio.to_thread()`. I/O cũ → đá sang ThreadPool (hiệu quả nhưng vẫn bị GIL). CPU nặng → đá sang ProcessPool (song song thật). Quy tắc: ưu tiên thư viện Asyncio thuần (aiohttp), chỉ kết hợp khi bất đắc dĩ."

---

## SLIDE 20 — 4.3 Master Flow (part3-master-simulation)
> Dashboard toàn cảnh: Event Loop + ThreadPool + Futures

**Lời nói:**
"Bức tranh toàn cảnh. *(Bấm chạy mô phỏng)*

Event Loop đóng vai Lễ tân. Gặp tác vụ Blocking → đá sang Worker Pool. Worker xong → kết quả chảy ngược lại. Tất cả phối hợp nhịp nhàng. Đây là cách **FastAPI**, **Uvicorn** vận hành hàng ngày."

> **📋 Q&A liên quan — Câu 16:** "Asyncio 1 Core, Server 32 Cores thì sao?"
> → "Mở 32 Process, mỗi Process khởi tạo 1 Event Loop riêng. 32 Cores chạy 32 Event Loops song song. Đây gọi là Multiple Workers — cách Uvicorn/FastAPI gánh hàng triệu kết nối."

> **📋 Q&A liên quan — Câu 19:** "concurrent.futures đồng bộ dữ liệu thế nào?"
> → "ThreadPool: dùng `threading.Lock()` hoặc `queue.Queue` (Thread-safe). ProcessPool: mỗi Process RAM riêng, không chia sẻ được. Giải pháp tốt nhất: Map & Collect — mỗi Process tính độc lập, `return` kết quả, Main Thread gom qua `as_completed()`. Không chung = không xung đột."

---

## SLIDE 21 — Tổng kết & Cảm ơn (part5-summary)
> 3 điểm cốt lõi + Nút Q&A

**Lời nói:**
"Tóm gọn 3 điều cốt lõi:
1. **Bản chất:** Tính toán bất đồng bộ = nghệ thuật triệt tiêu thời gian CPU Idle.
2. **Đa luồng/Tiến trình:** `concurrent.futures` cung cấp Executor. ProcessPool lách qua GIL.
3. **Đơn luồng:** `asyncio` = đỉnh cao đa nhiệm hợp tác, gánh vạn kết nối không cần Thread.

Nhóm 4 xin chân thành cảm ơn Cô và các bạn đã lắng nghe. Mình sẵn sàng nhận câu hỏi ạ!"

    > **🌟 Câu chốt nếu bị hỏi tổng hợp về đồng bộ dữ liệu:**
    > "Dạ thưa Cô, triết lý hiện đại nhất — dù Asyncio hay concurrent.futures — không phải nhồi nhét Locks khắp nơi gây Deadlock. Triết lý đúng là **Truyền thông điệp qua Queue** và **Thu thập kết quả độc lập qua Futures**. Hãy để dữ liệu chảy qua hàng đợi thay vì bắt các luồng tranh giành nhau!"

    ---

    ## SLIDE 22 — Mini Quiz: Kiểm Tra Nhanh (part5-quiz)
    > 5 câu hỏi trắc nghiệm tương tác với hiệu ứng đúng/sai.

    **Lời nói:**
    "Trước khi kết thúc phần báo cáo, nhóm mình có chuẩn bị một phần Mini Quiz nho nhỏ gồm 5 câu hỏi từ dễ đến khó để giúp mọi người tổng hợp lại toàn bộ kiến thức một cách nhẹ nhàng nhất.

    *(Mời khán giả trả lời và click vào đáp án)*

    **Câu 1:** Bản chất của Asyncio là tận dụng lúc rảnh rỗi.
    **Câu 2:** Lọt hàm blocking vào Event Loop là một thảm họa làm sập hệ thống.
    **Câu 3:** Khóa GIL làm ThreadPool chỉ ảo giác song song khi chờ I/O.
    **Câu 4:** Đa tiến trình (ProcessPool) là cách duy nhất lách qua GIL.
    **Câu 5:** Hybrid Architecture (run_in_executor) là cách đưa code cũ vào hệ thống mới an toàn nhất.

    Cảm ơn các bạn đã tham gia Mini Quiz! Mình xin kết thúc bài thuyết trình tại đây."
