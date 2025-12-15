import NotFound from "@/components/NotFound";

export default function GlobalNotFound() {
  return (
    <NotFound
      locale="vi"
      showBackButton={false}
      title="404 - Trang không tồn tại"
      subTitle="Xin lỗi, trang bạn đang tìm kiếm không tồn tại. Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ."
    />
  );
}
