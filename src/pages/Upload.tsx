import { useState, useEffect } from 'react'
import { useParams } from 'wouter'

const css = ".aw-upload{font-family:DM Sans,sans-serif;background:#f8fafc;min-height:100vh}" +
".aw-upload-header{background:#132347;padding:32px 40px;text-align:center}" +
".aw-upload-logo{font-size:18px;font-weight:800;color:#fff;margin-bottom:4px}" +
".aw-upload-header-sub{font-size:13px;color:#a8c0d8}" +
".aw-upload-main{max-width:640px;margin:0 auto;padding:40px 20px 80px}" +
".aw-upload-card{background:#fff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden}" +
".aw-upload-card-header{padding:24px 28px;border-bottom:1px solid #f1f4f8}" +
".aw-upload-title{font-size:20px;font-weight:800;color:#132347;margin-bottom:4px}" +
".aw-upload-sub{font-size:13px;color:#64748b}" +
".aw-upload-list{padding:8px 28px 20px}" +
".aw-upload-item{display:flex;align-items:center;gap:14px;padding:16px 0;border-bottom:1px solid #f1f4f8}" +
".aw-upload-item:last-child{border-bottom:none}" +
".aw-upload-item-icon{width:40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}" +
".aw-upload-item-icon.pending{background:#fef3c7}" +
".aw-upload-item-icon.done{background:#d1fae5}" +
".aw-upload-item-info{flex:1}" +
".aw-upload-item-name{font-size:14px;font-weight:700;color:#132347}" +
".aw-upload-item-status{font-size:12px;color:#64748b;margin-top:2px}" +
".aw-upload-item-status.done{color:#16a34a;font-weight:600}" +
".aw-upload-item-btn{position:relative;overflow:hidden}" +
".aw-upload-item-btn button{background:#132347;color:#fff;font-size:12px;font-weight:700;padding:8px 16px;border-radius:6px;border:none;cursor:pointer;font-family:DM Sans,sans-serif}" +
".aw-upload-item-btn button:disabled{opacity:0.6;cursor:not-allowed}" +
".aw-upload-item-btn input[type=file]{position:absolute;inset:0;opacity:0;cursor:pointer}" +
".aw-upload-done{text-align:center;padding:48px 28px}" +
".aw-upload-done-icon{font-size:56px;margin-bottom:12px}" +
".aw-upload-done-title{font-size:20px;font-weight:800;color:#132347;margin-bottom:8px}" +
".aw-upload-done-sub{font-size:14px;color:#64748b;line-height:1.6}" +
".aw-upload-loading{text-align:center;padding:80px 20px;font-size:14px;color:#64748b}" +
".aw-upload-error{text-align:center;padding:80px 20px}" +
".aw-upload-error-title{font-size:20px;font-weight:800;color:#132347;margin-bottom:8px}" +
".aw-upload-error-sub{font-size:14px;color:#64748b}" +
".aw-upload-footer{text-align:center;padding:20px}" +
".aw-upload-footer-text{font-size:12px;color:#94a3b8}"

const DOC_LABELS: Record<string,string> = {
  w9:'W-9 Form',st3:'ST-3 Sales Tax Exemption Certificate',ein:'EIN Verification Letter',
  formation:'Business Formation Documents',id:'Government-Issued Photo ID',
  resale:'Resale Certificate',insurance:'Certificate of Insurance',
}

type UploadInfo = {companyName:string;firstName:string;documents:string[];status:string;uploaded:{docType:string;fileName:string}[]}

export default function Upload() {
  const params = useParams<{token:string}>()
  const token = params?.token || ''
  const [info,setInfo] = useState<UploadInfo|null>(null)
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState('')
  const [uploading,setUploading] = useState<string|null>(null)
  const [uploaded,setUploaded] = useState<Record<string,string>>({})
  const [allDone,setAllDone] = useState(false)

  useEffect(() => {
    if (!token) return
    fetch('/api/upload-info?token='+token)
      .then(r => {if(!r.ok) throw new Error('nf');return r.json()})
      .then(data => {
        setInfo(data)
        const ex: Record<string,string> = {}
        data.uploaded?.forEach((u:any) => {ex[u.docType]=u.fileName})
        setUploaded(ex)
        if(data.status==='completed') setAllDone(true)
      })
      .catch(() => setError('This upload link is invalid or has expired.'))
      .finally(() => setLoading(false))
  }, [token])

  const handleUpload = async (docType:string, file:File) => {
    setUploading(docType)
    try {
      const res = await fetch('/api/upload-file?token='+token+'&docType='+docType+'&fileName='+encodeURIComponent(file.name),{method:'POST',body:file})
      if(res.ok){const data=await res.json();setUploaded(p=>({...p,[docType]:file.name}));if(data.allComplete) setAllDone(true)}
    } catch{} finally{setUploading(null)}
  }

  return (
    <><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap" rel="stylesheet" /><style>{css}</style>
      <div className="aw-upload">
        <div className="aw-upload-header"><div className="aw-upload-logo">AeroWholesale</div><div className="aw-upload-header-sub">Secure Document Upload</div></div>
        <div className="aw-upload-main">
          {loading ? <div className="aw-upload-loading">Loading...</div>
          : error ? <div className="aw-upload-error"><div className="aw-upload-error-title">Link Not Found</div><div className="aw-upload-error-sub">{error}</div></div>
          : allDone ? <div className="aw-upload-card"><div className="aw-upload-done"><div className="aw-upload-done-icon">✅</div><div className="aw-upload-done-title">All Documents Received!</div><div className="aw-upload-done-sub">Thank you, {info?.firstName}. We have received all documents for {info?.companyName}. Our team will review and you will hear from us within 1 business day.</div></div></div>
          : <div className="aw-upload-card">
              <div className="aw-upload-card-header"><div className="aw-upload-title">Upload Your Documents</div><div className="aw-upload-sub">Hi {info?.firstName} — please upload the following for {info?.companyName}.</div></div>
              <div className="aw-upload-list">
                {info?.documents.map(docType => {
                  const isDone = !!uploaded[docType]; const isUp = uploading === docType
                  return (<div key={docType} className="aw-upload-item">
                    <div className={'aw-upload-item-icon '+(isDone?'done':'pending')}>{isDone?'✅':'📄'}</div>
                    <div className="aw-upload-item-info">
                      <div className="aw-upload-item-name">{DOC_LABELS[docType]||docType}</div>
                      {isDone?<div className="aw-upload-item-status done">Uploaded: {uploaded[docType]}</div>
                      :isUp?<div className="aw-upload-item-status">Uploading...</div>
                      :<div className="aw-upload-item-status">PDF, JPG, or PNG</div>}
                    </div>
                    {!isDone && <div className="aw-upload-item-btn"><button disabled={isUp}>{isUp?'...':'Upload'}</button>
                      {!isUp && <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e=>{const f=e.target.files?.[0];if(f) handleUpload(docType,f);e.target.value=''}} />}
                    </div>}
                  </div>)
                })}
              </div>
            </div>}
          <div className="aw-upload-footer"><div className="aw-upload-footer-text">Your documents are transmitted securely and stored safely.</div></div>
        </div>
      </div>
    </>
  )
}
