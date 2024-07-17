import React from 'react'
import AdminSidebar from '../../Components/Admin/AdminSidebar/AdminSidebar'
import AdminHeader from '../../Components/Admin/AdminHeader/AdminHeader'
import AdminDownload from '../../Components/Admin/AdminDownload/AdminDownload'

export default function AdminDownloadPage() {
  return (
    <div>
      <AdminHeader/>
      <AdminSidebar/>
      <AdminDownload/>
    </div>
  )
}
