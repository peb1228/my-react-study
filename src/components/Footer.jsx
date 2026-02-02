export default function Footer() {
    return (
        <footer className="border-t bg-white">
            <div className="
        max-w-4xl mx-auto
        px-6 py-4
        flex flex-col md:flex-row
        items-center justify-between
        gap-2
        text-xs text-gray-400
      ">
                <span>© 2026 AiDOT. All rights reserved.</span>

                <div className="flex gap-4">
                    <button className="hover:text-gray-600">
                        이용약관
                    </button>
                    <button className="hover:text-gray-600">
                        개인정보처리방침
                    </button>
                </div>
            </div>
        </footer>

        
    );
}
