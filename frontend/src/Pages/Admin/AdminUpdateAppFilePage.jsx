import React from 'react'
import AdminHeader from '../../Components/Admin/AdminHeader/AdminHeader'
import AdminSidebar from '../../Components/Admin/AdminSidebar/AdminSidebar'
import AdminUpdateAppFile from '../../Components/Admin/AdminUpdateAppFile/AdminUpdateAppFile'

export default function AdminUpdateAppFilePage() {
  return (
    <div>
      <AdminHeader/>
      <AdminSidebar/>
      <AdminUpdateAppFile/>
    </div>
  )
}
