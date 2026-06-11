# TÀI LIỆU NỘI DUNG VÀ KỊCH BẢN THUYẾT TRÌNH CHI TIẾT
## ĐỀ TÀI: TÍNH TOÁN BẤT ĐỒNG BỘ (ASYNCHRONOUS COMPUTING)

Tài liệu này tổng hợp toàn bộ kiến thức từ các tài liệu gốc (`Asyncio_ChuyenSau.docx.txt`, `Concurrent.futures.txt`, `TTSSvaPT(DuyMan).txt`, `Tính toán ss.txt`), tổ chức thành một kịch bản thuyết trình mạch lạc, rõ ràng và chi tiết nhất cho **31 Slide**.

---

# BỐ CỤC CHƯƠNG TRÌNH THUYẾT TRÌNH

*   **PHẦN 01: KIẾN THỨC TỔNG QUAN** (Slide 1 - Slide 10)
    *   Định nghĩa, phân biệt các mô hình thực thi tuần tự, song song, bất đồng bộ đơn luồng và đa luồng.
    *   Phân tích trạng thái CPU (Busy/Idle) và tối ưu hóa thông lượng.
*   **PHẦN 02: MODULE CONCURRENT.FUTURES** (Slide 11 - Slide 19)
    *   Lớp Executor, ThreadPool, ProcessPool, cơ chế GIL trong Python, đối tượng Future và Callbacks.
*   **PHẦN 03: MODULE ASYNCIO** (Slide 20 - Slide 31)
    *   Event Loop, Event-driven Programming, Coroutine (`async/await`), Task, asyncio.Future, và các mô hình ứng dụng thực tế (Chaining, Pipeline, Fan-in/Fan-out).

---

# CHI TIẾT NỘI DUNG VÀ LỜI THOẠI CHO TỪNG SLIDE

## PHẦN 01: KIẾN THỨC TỔNG QUAN

### Slide 1: Slide Tiêu đề
*   **Nội dung hiển thị:**
    *   **Tiêu đề chính:** TÍNH TOÁN BẤT ĐỒNG BỘ
    *   **Tiêu đề phụ:** Khám phá Kiến trúc Bất đồng bộ, Module `concurrent.futures` và `asyncio` trong Python
    *   **Thông tin nhóm:** Nhóm thực hiện: Nhóm 4 | Môn học: Tính toán Song song & Phân tán
*   **Lời thoại thuyết trình:**
    > "Kính chào thầy và các bạn đã đến với buổi thuyết trình của Nhóm 4 hôm nay. Đề tài của chúng em là 'Tính toán bất đồng bộ'. Trong lập trình hiện đại, khi xây dựng các ứng dụng có lượng người dùng lớn hoặc xử lý dữ liệu dung lượng cao, hiệu năng hệ thống luôn là bài toán đau đầu nhất. Tính toán bất đồng bộ chính là chìa khóa để chúng ta vắt kiệt sức mạnh của phần cứng hiện tại mà không phải tốn chi phí nâng cấp. Hôm nay, chúng ta sẽ cùng khám phá bản chất lý thuyết của mô hình này và cách triển khai nó thông qua hai thư viện tiêu chuẩn trong Python."

---

### Slide 2: Mục lục & Giới thiệu Phần 1
*   **Nội dung hiển thị:**
    *   **PHẦN 1: KIẾN THỨC TỔNG QUAN**
    *   *Nội dung chính:*
        *   Định nghĩa Tính toán bất đồng bộ & Lập trình không chặn.
        *   Phân biệt các mô hình: Tuần tự, Song song, Bất đồng bộ đơn/đa luồng.
        *   Trạng thái CPU (Busy vs Idle) & Quy trình hoạt động của bất đồng bộ đơn luồng.
*   **Lời thoại thuyết trình:**
    > "Để có một cái nhìn toàn diện, trong Phần 01 này, chúng ta sẽ làm rõ các khái niệm cốt lõi: Thế nào là bất đồng bộ? Lập trình không chặn (non-blocking) hoạt động ra sao? Chúng ta cũng sẽ phân tích cách CPU phân bổ thời gian giữa các tác vụ tính toán và các tác vụ chờ đợi I/O để thấy rõ lý do tại sao bất đồng bộ lại mang lại hiệu năng vượt trội."

---

### Slide 3: Định nghĩa Tính toán bất đồng bộ & Non-blocking Programming
*   **Nội dung hiển thị:**
    *   **Tính toán bất đồng bộ:** Mô hình thực thi đồng thời (concurrency) trong đó các tác vụ được thực hiện đan xen và **không chặn (non-blocking)** lẫn nhau trên cùng một trục thời gian.
    *   **Lập trình không chặn (Non-blocking):** Phương pháp ngăn không cho các thao tác I/O (đọc/ghi file, kết nối cơ sở dữ liệu, gọi API) làm đóng băng luồng xử lý chính. Chương trình gửi yêu cầu xử lý I/O đi và nhận phản hồi ngay lập tức để tiếp tục chạy các tác vụ khác.
    *   **Ví dụ thực tế từ bài giảng:**
        *   *Bãi giữ xe:* Bảo vệ phát vé xe (Future) rồi tiếp tục phát cho xe khác ngay lập tức, không đợi khách dắt xe vào chỗ đỗ.
        *   *Đi thi:* Giám thị phát đề thi cho tất cả học sinh rồi đứng giám sát chung, không đứng đợi học sinh thứ nhất làm xong bài mới phát cho học sinh thứ hai.
*   **Lời thoại thuyết trình:**
    > "Trước tiên, ta cần định nghĩa chính xác: Tính toán bất đồng bộ là một dạng thực thi đồng thời (concurrency). Điểm cốt lõi là các tác vụ chạy đan xen nhau trên cùng một trục thời gian và không chặn lẫn nhau. Điều này đạt được nhờ lập trình không chặn (non-blocking). Trong slide bài giảng của chúng ta có đưa ra hai ví dụ rất trực quan để giải thích điều này:
    > 1. Đầu tiên là 'Bãi giữ xe': Khi bạn vào bãi, bảo vệ ghi vé và giao cho bạn (đây là Future - biên lai), rồi họ lập tức đón xe tiếp theo mà không cần đứng đợi bạn dắt xe vào đúng vị trí đỗ.
    > 2. Thứ hai là 'Đi thi': Giám thị phát đề thi cho toàn bộ học sinh trong phòng cùng lúc (các tác vụ chạy đồng thời). Họ sẽ không đứng đợi học sinh số 1 làm bài xong rồi mới phát đề cho học sinh số 2. Việc này giúp tiết kiệm thời gian chờ đợi cực kỳ lớn."


---

### Slide 4: Bản chất cốt lõi: Bất đồng bộ nền vs Song song truyền thống
*   **Nội dung hiển thị:**
    *   **Song song truyền thống (Sync Parallel):**
        *   Luồng chính chia nhỏ công việc thành nhiều phần.
        *   Phân bổ cho các luồng/tiến trình con chạy đồng thời trên các nhân CPU.
        *   **Luồng chính dừng hoạt động hoàn toàn** để chờ đợi tất cả các con hoàn thành (Blocking).
    *   **Bất đồng bộ nền (Async Parallel):**
        *   Luồng chính giao việc cho các luồng/tiến trình con chạy dưới nền.
        *   **Luồng chính vẫn tiếp tục hoạt động độc lập** để lắng nghe và xử lý các sự kiện khác (Non-blocking).
*   **Lời thoại thuyết trình:**
    > "Nhiều người thường nhầm lẫn giữa song song truyền thống và bất đồng bộ nền. Trong song song truyền thống, luồng chính chia việc ra cho các luồng con nhưng bản thân nó lại đứng im để chờ các con làm xong. Đây vẫn là cơ chế bị chặn (blocking). Còn trong bất đồng bộ nền, luồng chính giao việc xuống nền rồi ngay lập tức tiếp tục thực hiện công việc riêng của mình, ví dụ như tiếp tục nhận request mới từ khách hàng, hoàn toàn không bị đóng băng."

---

### Slide 5: So sánh Toàn diện 4 Mô hình Thực thi
*   **Nội dung hiển thị:**
    | Đặc điểm | Tuần tự (Sequential) | Song song truyền thống | Bất đồng bộ đơn luồng | Bất đồng bộ đa luồng |
    | :--- | :--- | :--- | :--- | :--- |
    | **Cách chạy** | Lần lượt từng việc một | Nhiều việc cùng lúc trên nhiều nhân | Xen kẽ việc trên 1 luồng duy nhất | Kết hợp coroutine và nhiều luồng |
    | **Khi gặp I/O** | Chặn luồng, CPU đứng đợi | Luồng con đợi, luồng khác chạy | Tác vụ tạm dừng, nhường quyền | Luồng chứa tác vụ tự chuyển việc |
    | **Tận dụng CPU** | Thấp do thời gian chờ lớn | Cao (nếu có nhiều nhân CPU) | Cao (giảm tối đa thời gian Idle) | Rất cao (kết hợp đa lõi + async) |
    | **Bộ điều phối** | Không có | Hệ điều hành (OS Scheduler) | Event Loop + Coroutines | Event Loop + Thread Pool |
*   **Lời thoại thuyết trình:**
    > "Để các bạn dễ hình dung, chúng em đã tổng hợp bảng so sánh 4 mô hình thực thi phổ biến nhất. Xử lý tuần tự là cơ bản nhất nhưng hiệu năng kém nhất do CPU phải đợi I/O. Song song truyền thống tận dụng tốt đa nhân CPU nhưng tốn tài nguyên do tạo nhiều luồng. Bất đồng bộ đơn luồng là giải pháp cực kỳ thông minh: chạy trên 1 luồng duy nhất nhưng các tác vụ tự nhường quyền cho nhau khi chờ I/O, giúp giảm chi phí quản lý luồng của hệ điều hành. Cuối cùng, bất đồng bộ đa luồng là mô hình mạnh mẽ nhất, kết hợp cả khả năng chạy không chặn lẫn tận dụng phần cứng đa lõi."

---

### Slide 6: Phân tích trạng thái CPU (Busy vs Idle)
*   **Nội dung hiển thị:**
    *   **Busy (Bận):** CPU đang tích cực thực hiện các lệnh tính toán (ví dụ: render hình ảnh, chạy thuật toán).
    *   **Idle (Nhàn rỗi):** CPU không có lệnh để chạy, phải đứng chờ các thiết bị ngoại vi hoặc mạng phản hồi dữ liệu.
    *   *Nguyên nhân lãng phí:* Tốc độ truyền mạng và đọc ghi đĩa chậm hơn tốc độ xử lý của CPU hàng triệu lần.
    *   *Giải pháp đồng thời:* Khi tác vụ A rơi vào trạng thái Idle (chờ I/O), CPU lập tức chuyển qua chạy phần tính toán của tác vụ B.
*   **Lời thoại thuyết trình:**
    > "Chúng ta hãy nhìn vào bản chất vật lý của CPU. CPU hoạt động ở hai trạng thái: Busy và Idle. Trong lập trình tuần tự, phần lớn thời gian CPU bị đẩy vào trạng thái Idle một cách lãng phí chỉ để chờ ổ cứng đọc xong file hoặc mạng tải xong dữ liệu. Bằng cách sử dụng lập trình đồng thời, ta tận dụng thời gian rảnh rỗi đó của tác vụ này để xử lý tính toán cho tác vụ khác. Mục tiêu tối thượng của chúng ta là giữ cho CPU luôn ở trạng thái Busy."

---

### Slide 7: Cơ chế Bất đồng bộ Không chặn Đơn luồng (Single-thread Async Workflow)
*   **Nội dung hiển thị:**
    *   **Quy trình 5 bước:**
        1.  **Gửi yêu cầu:** Luồng chính kích hoạt yêu cầu xử lý công việc.
        2.  **Treo tự nguyện (Yield):** Gặp tác vụ chờ I/O, coroutine tự treo trạng thái và nhường quyền kiểm soát.
        3.  **Làm việc khác:** Luồng chính quay lại xử lý các tác vụ khác trong hàng đợi.
        4.  **Nhận tín hiệu:** Hệ điều hành báo dữ liệu I/O đã sẵn sàng.
        5.  **Tiếp tục & Hoàn thành:** Luồng chính khôi phục coroutine cũ từ điểm đã dừng và chạy tiếp đến hết.
*   **Lời thoại thuyết trình:**
    > "Quy trình hoạt động của bất đồng bộ đơn luồng gồm 5 bước khép kín. Các bạn lưu ý bước 2: 'Treo tự nguyện'. Khác với đa luồng truyền thống bị hệ điều hành ngắt cưỡng bức, ở đây các coroutine tự nguyện nhường quyền điều khiển (yield) khi thấy mình phải chờ đợi. Khi dữ liệu đã sẵn sàng, hệ điều hành sẽ báo tín hiệu và Event Loop sẽ khôi phục coroutine đó để chạy tiếp từ đúng vị trí đã dừng."

---

### Slide 8: Bất đồng bộ kết hợp Đa luồng & Đa tiến trình
*   **Nội dung hiển thị:**
    *   **Thread-based Async (Tác vụ I/O-bound):**
        *   Event Loop đẩy các tác vụ chờ đợi I/O sang các luồng con (Thread Pool) dưới nền.
        *   Các luồng dùng chung bộ nhớ, tiêu tốn ít RAM, thích hợp cho việc đọc file hoặc gọi API.
    *   **Process-based Async (Tác vụ CPU-bound):**
        *   Event Loop đẩy các tác vụ tính toán nặng sang các tiến trình độc lập (Process Pool).
        *   Mỗi tiến trình chạy trên một nhân CPU thực tế, lách qua rào cản GIL của Python, thích hợp cho tính toán toán học, render ảnh.
*   **Lời thoại thuyết trình:**
    > "Mô hình đơn luồng rất mạnh cho I/O, nhưng đối với các bài toán thực tế phức tạp, ta phải kết hợp bất đồng bộ với đa luồng hoặc đa tiến trình. Nếu tác vụ là I/O-bound, Thread-based Async là lựa chọn tối ưu vì các luồng chia sẻ chung bộ nhớ, cực kỳ nhẹ. Nhưng nếu tác vụ là CPU-bound, đòi hỏi tính toán toán học nặng, ta phải sử dụng Process-based Async để chạy trên các tiến trình độc lập, tận dụng thực tế nhiều nhân CPU và vượt qua cơ chế khóa GIL của Python."

---

### Slide 9: Cơ chế hoạt động của Pool (Hồ chứa) và Task Queue
*   **Nội dung hiển thị:**
    *   **Hồ chứa (Pool):** Nhóm các worker (thread/process) được khởi tạo sẵn một lần duy nhất và duy trì dưới nền.
    *   **Hàng đợi tác vụ (Task Queue):** Bộ đệm lưu trữ các yêu cầu thực thi chưa có worker xử lý.
    *   **Cơ chế Tái sử dụng (Reuse):** Worker sau khi làm xong việc không bị hủy đi mà quay về Pool để nhận tác vụ mới từ Task Queue.
    *   *Lợi ích:* Triệt tiêu độ trễ (latency) của việc tạo/hủy luồng liên tục của hệ điều hành.
*   **Lời thoại gợi ý:**
    > "Để quản lý tài nguyên hiệu quả, các thư viện hiện đại dùng cơ chế Pooling và Task Queue. Việc tạo ra một luồng mới tiêu tốn khoảng 1MB đến 8MB bộ nhớ và mất thời gian cấp phát của hệ điều hành. Bằng cách khởi tạo sẵn một Pool (hồ chứa) gồm các worker rảnh rỗi và đưa các tác vụ vào một hàng đợi (Task Queue), các worker sẽ liên tục tái sử dụng (Reuse) để chạy các tác vụ mới. Điều này giúp loại bỏ hoàn toàn chi phí tạo và hủy luồng liên tục."

---

### Slide 10: [MÔ PHỎNG] Trực quan hóa Event Loop & Luồng xử lý
*   **Nội dung hiển thị:** *Bố cục giao diện bộ mô phỏng Event Loop trực quan*
    *   Khu vực bên trái: Nguồn tạo sự kiện (User Click, API Network Request, Database I/O).
    *   Khu vực giữa: Hàng đợi sự kiện (Event Queue) chứa các tác vụ chờ.
    *   Vòng xoay Event Loop liên tục kiểm tra hàng đợi.
    *   Khu vực bên phải: Luồng chính (Main Thread) thực thi các callback.
*   **Lời thoại thuyết trình:**
    > "Để trực quan hóa lý thuyết trên, xin mời thầy và các bạn cùng quan sát bộ mô phỏng đầu tiên. Chúng em đã xây dựng một Event Loop mô phỏng. Khi em nhấn nút 'Tạo sự kiện Click' hoặc 'Tạo yêu cầu Mạng', các quả bóng màu đại diện cho tác vụ sẽ được đẩy vào Event Queue. Vòng xoay Event Loop sẽ quay và kéo quả bóng vào Main Thread để xử lý. Các bạn có thể thấy, nếu Main Thread đang bận xử lý một quả bóng đỏ (CPU-heavy), các quả bóng khác bắt buộc phải xếp hàng chờ đợi trong queue."

---

## PHẦN 02: MODULE CONCURRENT.FUTURES

### Slide 11: Giới thiệu Phần 2
*   **Nội dung hiển thị:**
    *   **PHẦN 02: MODULE CONCURRENT.FUTURES**
    *   *Nội dung chính:*
        *   Tổng quan module & lớp trừu tượng Executor.
        *   Phương thức submit(), map(), và shutdown().
        *   Trạng thái và vòng đời của đối tượng Future.
        *   So sánh ThreadPoolExecutor vs ProcessPoolExecutor và cơ chế GIL.
*   **Lời thoại thuyết trình:**
    > "Bây giờ chúng ta sẽ bước sang Phần 2, đi sâu vào module `concurrent.futures`. Đây là thư viện chuẩn của Python giúp chúng ta triển khai đa luồng và đa tiến trình một cách đơn giản nhất thông qua các API cấp cao, loại bỏ hoàn toàn việc phải viết mã quản lý luồng thủ công phức tạp."

---

### Slide 12: Tổng quan & Lớp trừu tượng Executor
*   **Nội dung hiển thị:**
    *   **Lịch sử:** Ra mắt từ Python 3.2, xây dựng trên nền tảng của module `threading` và `multiprocessing`.
    *   **Lớp trừu tượng Executor:** Định nghĩa giao diện chuẩn để thực thi các lệnh gọi bất đồng bộ.
    *   *Quy tắc:* **Không khởi tạo trực tiếp** Executor. Phải sử dụng thông qua các lớp con cụ thể: `ThreadPoolExecutor` hoặc `ProcessPoolExecutor`.
*   **Lời thoại thuyết trình:**
    > "Module `concurrent.futures` cung cấp lớp trừu tượng `Executor`. Đây là một abstract class định nghĩa ra các giao diện chuẩn để giao việc bất đồng bộ. Lập trình viên không được khởi tạo trực tiếp lớp này vì nó chưa chứa logic quản lý worker cụ thể bên dưới. Chúng ta bắt buộc phải sử dụng các lớp con cụ thể của nó là ThreadPoolExecutor hoặc ProcessPoolExecutor để chạy chương trình."

---

### Slide 13: Các phương thức phân phối tác vụ: submit() vs map() & shutdown()
*   **Nội dung hiển thị:**
    *   **submit(fn, *args, **kwargs):** Giao một tác vụ đơn lẻ chạy ngầm (non-blocking). Trả về ngay lập tức một đối tượng Future đại diện cho tác vụ đó.
    *   **map(fn, *iterables):** Giao việc hàng loạt. Tự động lặp qua tập dữ liệu và chạy hàm `fn` đồng thời. Trả về một iterator chứa kết quả theo đúng thứ tự ban đầu.
    *   **shutdown(wait=True):** Giải phóng tài nguyên của Pool. Khuyên dùng cú pháp `with` để tự động gọi `shutdown` an toàn:
        ```python
        with ThreadPoolExecutor() as executor:
            # Tự động gọi executor.shutdown(wait=True) khi thoát khối lệnh
        ```
*   **Lời thoại thuyết trình:**
    > "Lớp Executor cung cấp 3 phương thức quan trọng nhất. Đầu tiên là `submit()`, dùng để giao một công việc đơn lẻ và nhận lại ngay một 'biên lai' Future. Thứ hai là `map()`, cực kỳ thích hợp khi bạn có một danh sách dữ liệu khổng lồ (ví dụ 1.000 bức ảnh) cần áp dụng chung một bộ lọc, nó sẽ tự động phân phối các bức ảnh này vào Pool để xử lý song song. Cuối cùng là `shutdown()` để giải phóng tài nguyên. Chúng ta nên dùng context manager với từ khóa `with` để tránh việc quên đóng Pool dẫn đến rò rỉ bộ nhớ."

---

### Slide 14: Đối tượng Future (Tờ biên lai) và Vòng đời
*   **Nội dung hiển thị:**
    *   **Khái niệm:** Đối tượng đại diện cho kết quả của một tác vụ đang chạy ngầm. Lập trình viên không tự tạo thủ công, hệ thống tự trả về qua `executor.submit()`.
    *   **Vòng đời Future:**
        ```
        ┌───────────┐      ┌───────────┐      ┌───────────┐
        │  PENDING  │ ───> │  RUNNING  │ ───> │   DONE    │ (Thành công / Lỗi)
        └───────────┘      └───────────┘      └───────────┘
              │                                     ▲
              └──────────── CANCELLED ──────────────┘
        ```
*   **Lời thoại thuyết trình:**
    > "Hãy nói kỹ hơn về đối tượng Future. Khi bạn gọi `submit()`, hệ thống trả về một Future. Hãy tưởng tượng nó là một chiếc thẻ rung hay tờ biên lai khi bạn đi mua trà sữa. Tại thời điểm nhận thẻ, trà sữa chưa làm xong. Tờ biên lai này sẽ trải qua vòng đời: PENDING (đang đợi trong hàng đợi của quán), RUNNING (nhân viên đang pha chế), DONE (pha chế xong, chứa đồ uống hoặc báo hết nguyên liệu) hoặc CANCELLED (bạn hủy đơn trước khi nhân viên kịp làm)."

---

### Slide 15: Điều khiển Future & Cơ chế Callback
*   **Nội dung hiển thị:**
    *   **Nhóm trạng thái:** `running()`, `done()`, `cancelled()`.
    *   **Nhóm điều khiển:**
        *   `cancel()`: Hủy tác vụ. Chỉ thành công (trả về `True`) khi tác vụ đang ở trạng thái PENDING. Thất bại (trả về `False`) nếu tác vụ đã RUNNING hoặc DONE.
        *   `result(timeout)`: Lấy kết quả. Sẽ chặn luồng chính (blocking) nếu tác vụ chưa xong. Ném ra `TimeoutError` nếu quá hạn.
    *   **add_done_callback(fn):** Gắn hàm callback `fn` tự động kích hoạt ngay khi Future hoàn tất. Giúp luồng chính hoàn toàn tự do làm việc khác.
*   **Lời thoại thuyết trình:**
    > "Để tương tác với Future, ta có các hàm kiểm tra trạng thái và hàm `cancel()` để hủy tác vụ. Các bạn lưu ý: hàm `result()` dùng để lấy kết quả, nhưng nếu tác vụ chưa chạy xong thì hàm này sẽ khóa luồng chính lại để chờ (blocking). Để giải quyết vấn đề này, ta dùng cơ chế Callback qua phương thức `add_done_callback()`. Thay vì đứng đợi, ta để lại số điện thoại (đăng ký callback), khi nào đồ uống xong, nhân viên sẽ tự động gọi điện thông báo cho bạn (kích hoạt callback)."

---

### Slide 16: So sánh ThreadPoolExecutor và ProcessPoolExecutor
*   **Nội dung hiển thị:**
    *   **ThreadPoolExecutor (Đa luồng):**
        *   Worker là các Threads. Dùng chung không gian bộ nhớ của tiến trình cha.
        *   Thích hợp cho tác vụ **I/O-bound** (đọc ghi file, gọi mạng).
        *   Bị ảnh hưởng bởi khóa **GIL (Global Interpreter Lock)** của Python.
    *   **ProcessPoolExecutor (Đa tiến trình):**
        *   Worker là các Processes độc lập. Không chia sẻ bộ nhớ.
        *   Thích hợp cho tác vụ **CPU-bound** (tính toán nặng, xử lý ảnh).
        *   Lách qua được GIL (mỗi tiến trình có một GIL riêng) -> Đạt song song thực sự.
        *   Yêu cầu dữ liệu truyền vào phải có khả năng tuần tự hóa (**picklable**).
*   **Lời thoại thuyết trình:**
    > "Đây là bảng so sánh cực kỳ cốt lõi giữa hai bộ Executor. ThreadPool hoạt động trên các luồng chia sẻ chung bộ nhớ, rất nhẹ nhưng vướng cơ chế khóa GIL của Python nên không thể chạy song song các phép toán nặng cùng lúc. ProcessPool hoạt động trên các tiến trình độc lập, mỗi tiến trình có một khóa GIL riêng nên chạy song song thực sự trên nhiều nhân CPU, rất thích hợp cho việc xử lý ảnh hay chạy AI. Tuy nhiên, vì không dùng chung bộ nhớ nên dữ liệu gửi qua lại giữa các tiến trình phải được tuần tự hóa (picklable) thành chuỗi byte."

---

### Slide 17: Lưu ý kỹ thuật: Deadlocks & BrokenProcessPool
*   **Nội dung hiển thị:**
    *   **Deadlocks (Bế tắc) ở ThreadPoolExecutor:** Xảy ra khi một tác vụ đang chạy lại đứng chờ kết quả của một Future khác cũng đang nằm trong hàng đợi của cùng một Pool.
    *   **BrokenProcessPool ở ProcessPoolExecutor:** Ngoại lệ nghiêm trọng xảy ra khi một tiến trình worker bị sập đột ngột (do tràn bộ nhớ, lỗi phân đoạn hệ thống), khiến toàn bộ hồ chứa bị hỏng và không thể nhận thêm tác vụ mới.
*   **Lời thoại thuyết trình:**
    > "Khi làm việc với các Pool, có hai lỗi hệ thống nghiêm trọng mà lập trình viên cần lưu ý. Thứ nhất là Deadlock trong ThreadPool, xảy ra khi các luồng chờ đợi chéo nhau (tác vụ A chờ tác vụ B trong khi Pool hết worker rảnh). Thứ hai là BrokenProcessPool trong ProcessPool, xảy ra khi một tiến trình con bị hệ điều hành tiêu diệt đột ngột (ví dụ do lỗi C-extension hoặc tràn RAM), khiến Pool bị hỏng hoàn toàn."

---

### Slide 18: Ví dụ Code thực tế sử dụng `concurrent.futures`
*   **Nội dung hiển thị:**
    ```python
    from concurrent.futures import ThreadPoolExecutor
    import urllib.request

    URLS = ['http://www.foxnews.com/', 'http://www.cnn.com/', 'http://europe.wsj.com/']

    def load_url(url, timeout):
        with urllib.request.urlopen(url, timeout=timeout) as conn:
            return conn.read()

    # Sử dụng context manager với max_workers = 3
    with ThreadPoolExecutor(max_workers=3) as executor:
        # executor.map trả về kết quả theo đúng thứ tự của danh sách URLS
        results = executor.map(lambda url: load_url(url, 60), URLS)
        
        for url, data in zip(URLS, results):
            print(f"{url} tải xong với độ dài {len(data)} bytes")
    ```
*   **Lời thoại thuyết trình:**
    > "Xin mời các bạn nhìn lên màn hình để xem một ví dụ code Python thực tế. Ở đây chúng ta muốn tải nội dung của 3 trang báo mạng cùng lúc. Chúng ta khởi tạo một ThreadPoolExecutor với 3 worker và dùng phương thức `executor.map`. Dưới nền, Python tự động tạo ra 3 luồng, mỗi luồng tải một trang báo độc lập. Hàm `map` sẽ chặn chương trình chính cho đến khi tất cả các luồng chạy xong và trả về kết quả theo đúng thứ tự."

---

### Slide 19: [MÔ PHỎNG] ThreadPool vs ProcessPool & GIL Lock
*   **Nội dung hiển thị:** *Bố cục giao diện bộ mô phỏng Executor Pool*
    *   Khu vực chọn cấu hình: ThreadPool (GIL Active) vs ProcessPool (GIL Bypassed).
    *   Khu vực gửi tác vụ: Tác vụ I/O-bound (màu xanh lá) vs Tác vụ CPU-bound (màu đỏ).
    *   Biểu diễn trực quan GIL dưới dạng ổ khóa di động.
    *   Biểu đồ tải CPU của 4 nhân độc lập (Core 0, Core 1, Core 2, Core 3).
*   **Lời thoại thuyết trình:**
    > "Bây giờ, chúng ta hãy cùng quan sát bộ mô phỏng thứ hai của nhóm chúng em. Trên slide này, các bạn có thể bấm nút gửi các tác vụ tính toán nặng. Nếu chúng ta chọn ThreadPool, các bạn sẽ thấy biểu tượng GIL Lock màu đỏ liên tục nhảy qua lại, chỉ cho phép một Core bận (Busy) tại một thời điểm. Nhưng khi chuyển sang ProcessPool, cả 4 Core CPU đều sáng xanh và chạy 100% công suất cùng lúc. Điều này mô tả hoàn hảo cách ProcessPool lách qua GIL của Python."

---

## PHẦN 03: MODULE ASYNCIO

### Slide 20: Giới thiệu Phần 3
*   **Nội dung hiển thị:**
    *   **PHẦN 03: MODULE ASYNCIO**
    *   *Nội dung chính:*
        *   Các thành phần chính của asyncio & So sánh với concurrent.futures.
        *   Event Loop & Lập trình sự kiện (Event-driven Programming).
        *   Coroutines (`async/await`), Tasks, và asyncio.Future.
        *   Các mô hình ứng dụng: Chaining, Pipeline, Fan-in & Fan-out.
*   **Lời thoại thuyết trình:**
    > "Chúng ta bước vào Phần 3: Module `asyncio`. Đây là thư viện chuẩn từ Python 3.4 giúp lập trình bất đồng bộ hiệu năng cực cao dựa trên cơ chế đơn luồng. Đây là nền tảng đứng sau các web framework siêu nhanh hiện nay như FastAPI hay aiohttp."

---

### Slide 21: Thành phần chính của asyncio & So sánh với concurrent.futures
*   **Nội dung hiển thị:**
    *   **4 thành phần cốt lõi:**
        *   **Event Loop:** Bộ não điều phối trung tâm.
        *   **Coroutines:** Khối logic công việc có khả năng tạm dừng.
        *   **Tasks:** Đối tượng bao bọc để chạy song song coroutine.
        *   **Futures:** Đối tượng chứa kết quả trong tương lai.
    *   **So sánh nhanh:**
        *   `concurrent.futures`: Dựa trên đa luồng/đa tiến trình (hệ điều hành quản lý), dùng cho thư viện chặn (blocking I/O) hoặc tính toán CPU.
        *   `asyncio`: Hoạt động đơn luồng, hướng sự kiện, không bị GIL cản trở, cực kỳ tối ưu cho hàng vạn kết nối mạng đồng thời.
*   **Lời thoại thuyết trình:**
    > "asyncio hoạt động trên một kiến trúc hướng sự kiện đơn luồng. Thay vì tạo nhiều luồng hệ điều hành tốn RAM và mất thời gian chuyển đổi ngữ cảnh, asyncio sử dụng một Event Loop duy nhất để phân bổ CPU cho hàng vạn coroutine. Nó cực kỳ tối ưu cho các tác vụ I/O mạng có độ trễ cao, trong khi `concurrent.futures` thích hợp hơn khi bạn phải làm việc với các thư viện cũ không hỗ trợ bất đồng bộ."

---

### Slide 22: Khái niệm Lập trình sự kiện (Event-driven Programming)
*   **Nội dung hiển thị:**
    *   **Khái niệm:** Mô hình lập trình trong đó luồng thực thi của chương trình được điều khiển bởi các sự kiện (events).
    *   **3 thành phần nền tảng:**
        *   **Nguồn sự kiện (Event Source):** Nơi phát sinh sự kiện (nhấp chuột, gõ phím, gói tin mạng nhận được).
        *   **Hàng đợi sự kiện (Event Queue):** Bộ đệm lưu trữ các sự kiện đã xảy ra để chờ xử lý tuần tự.
        *   **Bộ xử lý sự kiện (Event Handler):** Hàm callback do lập trình viên viết để thực thi logic khi sự kiện xảy ra.
*   **Lời thoại thuyết trình:**
    > "Để hiểu asyncio, ta phải hiểu lập trình hướng sự kiện. Ở mô hình này, chương trình không chạy tuần tự từ trên xuống dưới nữa. Luồng chạy được quyết định bởi các sự kiện xảy ra bên ngoài. Các sự kiện này được xếp gọn gàng vào Event Queue. Khi luồng chính rảnh rỗi, hệ thống sẽ tự động rút sự kiện ra và kích hoạt bộ xử lý sự kiện tương ứng (Event Handler) dưới dạng các hàm callback."

---

### Slide 23: Trái tim của hệ thống: Vòng lặp sự kiện (Event Loop)
*   **Nội dung hiển thị:**
    *   **Chức năng:** Chạy liên tục theo chu kỳ suốt vòng đời chương trình.
    *   **Cơ chế hoạt động:**
        ```
        ┌───────────┐      ┌─────────────┐      ┌───────────────┐
        │  Chờ sự   │ ───> │ Nhận sự kiện│ ───> │  Gọi Handler  │
        │   kiện    │      │ từ Queue    │      │  tương ứng    │
        └───────────┘      └─────────────┘      └───────────────┘
              ▲                                         │
              └──────────────── lặp lại ────────────────┘
        ```
    *   **Nguyên tắc vàng:** Chỉ có duy nhất 1 Event Loop chạy trên 1 tiến trình tại một thời điểm.
*   **Lời thoại thuyết trình:**
    > "Event Loop chính là trái tim của cả hệ thống. Nó hoạt động theo một vòng lặp chu kỳ liên tục: Chờ sự kiện -> Lấy sự kiện từ hàng đợi -> Gọi trình xử lý -> Lặp lại chu kỳ. Điều quan trọng cần nhớ là Event Loop chạy trên luồng chính của tiến trình. Do đó, nếu bạn viết một hàm blocking nặng (như `time.sleep`) bên trong Event Loop, toàn bộ hệ thống sẽ bị đóng băng ngay lập tức."

---

### Slide 24: Ẩn dụ thực tế: Cửa hàng thức ăn nhanh
*   **Nội dung hiển thị:**
    *   **Event Loop = Người quản lý cửa hàng:** Đứng ở quầy order, nhận hóa đơn (bill), xếp hóa đơn vào thanh kẹp (Event Queue).
    *   **Main Thread = Đầu bếp duy nhất:** Trong bếp chỉ có duy nhất một đầu bếp làm nhiệm vụ nấu ăn.
    *   **Cơ chế hoạt động:**
        *   Khách hàng order liên tục (nhiều sự kiện). Người quản lý kẹp hóa đơn vào thanh kẹp.
        *   Đầu bếp nấu xong một món, người quản lý lập tức rút hóa đơn tiếp theo đưa cho đầu bếp nấu.
        *   Đầu bếp không bao giờ phải rảnh tay đứng đợi khách chọn món -> Tối ưu hóa 100% hiệu suất nhà bếp.
*   **Lời thoại thuyết trình:**
    > "Để giải thích một cách trực quan cơ chế đơn luồng này, hãy tưởng tượng một cửa hàng thức ăn nhanh. Event Loop đóng vai trò là Người quản lý ở quầy order. Luồng chính (Main Thread) là Người đầu bếp duy nhất trong bếp. Khi có 10 khách hàng vào order cùng lúc, người quản lý in ra 10 hóa đơn kẹp vào thanh treo (đây là Event Queue). Người đầu bếp cứ nấu xong món này lại lấy hóa đơn tiếp theo để làm. Đầu bếp không cần đứng đợi khách chọn món, giúp tối ưu hóa công suất của bếp chỉ với một người nấu."

---

### Slide 25: Định nghĩa Coroutine & Bảng so sánh
*   **Nội dung hiển thị:**
    *   **Coroutine (Đồng chương trình):** Chương trình con cải tiến, có khả năng tạm dừng (suspend) thực thi để nhường quyền kiểm soát cho tác vụ khác, và khôi phục (resume) lại tại đúng vị trí cũ mà không mất đi trạng thái (biến cục bộ).
    *   **So sánh chi tiết:**
        | Tiêu chí | Subroutine (Hàm thường) | Coroutine (Đồng chương trình) | Thread (Luồng hệ điều hành) |
        | :--- | :--- | :--- | :--- |
        | **Điểm vào/ra** | 1 điểm vào, 1 điểm thoát | Nhiều điểm vào/ra/tạm dừng | Chạy độc lập từ đầu đến cuối |
        | **Bảo toàn trạng thái** | Xóa sạch khi return | Lưu giữ nguyên vẹn khi tạm dừng | Lưu trong ngăn xếp (stack) riêng |
        | **Cơ chế điều phối** | Tuần tự | Hợp tác (Cooperative) | Tranh đoạt (Preemptive - OS ngắt) |
        | **Chi phí RAM** | Cực thấp | Cực thấp (~vài KB) | Cao (~1MB - 8MB mỗi luồng) |
*   **Lời thoại thuyết trình:**
    > "Khái niệm cốt lõi tiếp theo là Coroutine (đồng chương trình). Khác với hàm thông thường (subroutine) chỉ có một điểm vào và một điểm ra bằng return, Coroutine cho phép tạm dừng ở giữa chừng và tiếp tục lại sau đó. Hãy nhìn vào bảng so sánh: Coroutine hoạt động theo cơ chế hợp tác (cooperative), tự nguyện nhường quyền điều khiển khi gặp lệnh await. Nó tiêu tốn cực kỳ ít tài nguyên so với luồng hệ điều hành (chỉ vài KB so với vài MB của luồng), giúp hệ thống mở rộng quy mô cực kỳ tốt."

---

### Slide 26: Cơ chế Tạm dừng & Khôi phục (yield, await, next, send)
*   **Nội dung hiển thị:**
    *   **Tạm dừng (Suspend):** Thông qua từ khóa `yield` hoặc `await`. Lưu trữ Instruction Pointer, Local Variables, Stack Frame, và Execution Context vào bộ nhớ.
    *   **Khôi phục (Resume):**
        *   Với generator-based coroutine: Gọi `next()` hoặc `send(value)` để truyền dữ liệu vào.
        *   Với native coroutine: Event Loop tự động khôi phục khi nhận tín hiệu I/O hoàn thành.
*   **Lời thoại thuyết trình:**
    > "Làm thế nào Coroutine tạm dừng và khôi phục mà không làm mất dữ liệu? Khi gặp từ khóa yield hoặc await, Python sẽ đóng băng trạng thái hiện tại của hàm gồm con trỏ dòng lệnh và các biến cục bộ trong Stack Frame. Để khôi phục, ta có thể dùng hàm `next()` hoặc `send()` để truyền dữ liệu mới vào coroutine. Trong module asyncio, Event Loop sẽ tự động đảm nhận việc gọi khôi phục này khi hệ điều hành báo rằng thao tác I/O đã hoàn tất."

---

### Slide 27: Cú pháp khai báo Coroutine: Cũ vs Mới
*   **Nội dung hiển thị:**
    *   **Cú pháp cũ (Python 3.4):** Dựa trên Generator.
        ```python
        @asyncio.coroutine
        def fetch_data():
            yield from asyncio.sleep(2)
        ```
        *   *Trạng thái:* Bị lỗi thời từ Python 3.8 và **bị loại bỏ hoàn toàn trong Python 3.11**.
    *   **Cú pháp mới (Python 3.5+):** Native Coroutine.
        ```python
        async def fetch_data():
            await asyncio.sleep(2)
        ```
        *   *Ưu điểm:* Hiệu năng cao hơn, hỗ trợ kiểm tra kiểu nghiêm ngặt (type hint), cú pháp tường minh.
*   **Lời thoại thuyết trình:**
    > "Trong lịch sử phát triển của Python, cú pháp coroutine đã trải qua một sự thay đổi lớn. Ở phiên bản 3.4, coroutine được khai báo bằng decorator `@asyncio.coroutine` kết hợp với từ khóa `yield from`. Từ phiên bản 3.5 trở đi, Python giới thiệu cú pháp nguyên bản `async def` và `await`. Cú pháp mới này chạy nhanh hơn, dễ viết hơn và đã trở thành tiêu chuẩn bắt buộc từ Python 3.11 sau khi cú pháp cũ bị loại bỏ hoàn toàn."

---

### Slide 28: Quản lý Tác vụ (asyncio.Task) & asyncio.Future
*   **Nội dung hiển thị:**
    *   **asyncio.Task:** Lớp con của `asyncio.Future`. Dùng để đóng gói một coroutine và chủ động lên lịch thực thi nó trong Event Loop.
    *   *So sánh:* Coroutine là tĩnh (blueprint), còn Task là thực thể đang chạy (active).
    *   **Các phương thức chính:**
        *   `task.cancel()`: Gửi ngoại lệ `asyncio.CancelledError` vào coroutine để dọn dẹp tài nguyên.
        *   `task.done()`, `task.result()`, `task.add_done_callback(fn)`.
    *   **So sánh hai loại Future:**
        *   `concurrent.futures.Future`: Dùng cho Thread/Process Pool, an toàn đa luồng, gọi `.result()` sẽ khóa luồng (blocking).
        *   `asyncio.Future`: Dùng cho Event Loop, không an toàn đa luồng, hỗ trợ từ khóa `await` không khóa luồng.
*   **Lời thoại thuyết trình:**
    > "Để quản lý một coroutine đang chạy, ta dùng đối tượng `asyncio.Task`. Các bạn lưu ý sự khác biệt: Coroutine giống như một bản thiết kế tĩnh (blueprint), còn Task là công trình đang được thi công thực tế trên Event Loop. Task kế thừa trực tiếp từ `asyncio.Future`. Điểm khác biệt lớn nhất giữa Future của asyncio và Future của concurrent.futures là Future của asyncio hỗ trợ từ khóa `await`, cho phép luồng chính hoàn toàn không bị khóa khi chờ kết quả."

---

### Slide 29: Ví dụ Code thực tế sử dụng `asyncio`
*   **Nội dung hiển thị:**
    ```python
    import asyncio
    import time

    async def download_file(name, delay):
        print(f"Bắt đầu tải: {name}")
        await asyncio.sleep(delay)  # Nhường quyền điều khiển khi chờ I/O
        print(f"Tải xong: {name} sau {delay}s")
        return f"Dữ liệu {name}"

    async def main():
        start = time.time()
        # Chạy đồng thời 3 tác vụ tải file bất đồng bộ
        results = await asyncio.gather(
            download_file("file_1.pdf", 3),
            download_file("file_2.png", 2),
            download_file("file_3.csv", 1)
        )
        print(f"Kết quả: {results}")
        print(f"Tổng thời gian: {time.time() - start:.1f} giây")

    asyncio.run(main())
    ```
*   **Lời thoại thuyết trình:**
    > "Trên màn hình là ví dụ sử dụng thư viện `asyncio` hiện đại. Chúng ta định nghĩa một coroutine `download_file` sử dụng từ khóa `async def`. Khi chạy hàm `main()`, chúng ta sử dụng `asyncio.gather` để gộp 3 tác vụ tải file lại. Khi chạy thực tế, thay vì mất 6 giây để tải tuần tự, chương trình chỉ mất đúng 3 giây (bằng thời gian của tác vụ lâu nhất) để hoàn thành cả 3 file. Điều này chứng minh sức mạnh thực thi đồng thời vượt trội của asyncio."

---

### Slide 30: Ứng dụng Coroutine: Chaining, Pipeline, Fan-in & Fan-out
*   **Nội dung hiển thị:**
    *   **Chaining (Chuỗi liên kết):** Các coroutine gọi nối tiếp nhau tuần tự (Tác vụ 1 -> Tác vụ 2 -> Tác vụ 3).
    *   **Pipeline (Đường ống):** Dữ liệu chảy qua các trạm xử lý ngầm (Database -> Clean -> Normalise -> Warehouse) -> Ứng dụng trong Video Streaming, xử lý ETL dữ liệu lớn.
    *   **Fan-in (Nhiều vào - Một ra):** Nhiều nguồn dữ liệu độc lập gom về một bộ xử lý trung tâm (IoT cảm biến, websocket client).
    *   **Fan-out (Một vào - Nhiều ra):** Một nguồn kích hoạt nhiều tác vụ đầu ra đồng thời (Camera an ninh -> Lưu video + Nhận diện khuôn mặt + Báo động còi).
*   **Lời thoại thuyết trình:**
    > "Trong các hệ thống lớn, Coroutine được tổ chức theo các mô hình kiến trúc rất thông minh. Ta có mô hình Chaining kết nối các tác vụ tuần tự; mô hình Pipeline truyền dẫn dữ liệu giống như đường ống nước, cực kỳ phù hợp cho streaming video thời gian thực; mô hình Fan-in dùng để thu gom dữ liệu từ hàng vạn cảm biến IoT về máy chủ; và mô hình Fan-out giúp một sự kiện đầu vào kích hoạt đồng thời nhiều hành động đầu ra dưới nền mà không làm trễ hệ thống."

---

### Slide 31: [MÔ PHỎNG] Hoạt động của Coroutine và await
*   **Nội dung hiển thị:** *Bố cục giao diện bộ mô phỏng Coroutines*
    *   Khu vực hiển thị: Hai Coroutine (Task A và Task B) cùng chạy trên 1 Single Thread.
    *   Bảng trạng thái Memory Stack của từng Task.
    *   Nút bấm "Chạy Mô Phỏng".
    *   Hoạt họa: Khi Task A chạy đến dòng lệnh `await`, stack frame của nó được đóng gói thành một tấm thẻ đưa vào Memory, luồng chính lập tức trống và Task B nhảy vào chạy. Khi Task B gặp `await`, nó cũng nhường quyền, và Task A khôi phục chạy tiếp.
*   **Lời thoại thuyết trình:**
    > "Để khép lại phần lý thuyết, xin mời thầy và các bạn cùng quan sát bộ mô phỏng thứ ba của nhóm chúng em. Đây là mô phỏng hoạt động của Coroutine trên một luồng đơn. Khi Task A chạy đến lệnh await, các bạn sẽ thấy stack frame của nó được thu nhỏ thành một thẻ nhớ lưu vào RAM, giải phóng luồng chính để Task B nhảy vào chạy ngay lập tức. Toàn bộ quá trình chuyển đổi này diễn ra cực kỳ nhanh ở cấp độ ứng dụng mà không cần sự can thiệp đắt đỏ của hệ điều hành."

---

### Slide 32: Tổng kết & Thảo luận (Q&A)
*   **Nội dung hiển thị:**
    *   **Tóm tắt cốt lõi:**
        *   Bất đồng bộ giúp giảm thiểu thời gian CPU nhàn rỗi (Idle) do chờ đợi I/O.
        *   `concurrent.futures` cung cấp các Executor cấp cao cho đa luồng và đa tiến trình (lách GIL).
        *   `asyncio` tối ưu hóa hàng vạn tác vụ I/O-bound trên một luồng duy nhất nhờ đa nhiệm hợp tác (cooperative multitasking).
    *   **Cảm ơn thầy và các bạn đã lắng nghe!**
    *   *Hỏi & Đáp (Q&A)*
*   **Lời thoại thuyết trình:**
    > "Để tổng kết lại, tính toán bất đồng bộ là một giải pháp thiết kế phần mềm thông minh giúp tối ưu hóa tối đa hiệu suất phần cứng. Tùy thuộc vào tác vụ của bạn là I/O-bound hay CPU-bound, bạn có thể lựa chọn module asyncio đơn luồng hoặc concurrent.futures đa tiến trình. Bài thuyết trình của Nhóm 4 chúng em đến đây là kết thúc. Chúng em xin chân thành cảm ơn thầy và các bạn đã chú ý lắng nghe. Sau đây, nhóm chúng em xin phép nhận các câu hỏi và ý kiến đóng góp từ thầy và các bạn."
