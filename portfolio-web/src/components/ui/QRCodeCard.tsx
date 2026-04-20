import { QRCodeCanvas } from 'qrcode.react'

export function QRCodeCard() {
    const portfolioUrl = window.location.origin // auto current site

    return (
        <div className="mx-auto w-fit flex flex-col items-center gap-3 rounded-2xl border p-4 shadow-sm">      <p className="text-sm text-slate-500">
            Scan to open my portfolio
        </p>

            <QRCodeCanvas
                value={portfolioUrl}
                size={160}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
            />
        </div>
    )
}