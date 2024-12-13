import { useParams } from 'react-router-dom'
import { Table, Button, Descriptions, Card, Skeleton, Row, Col, Popconfirm, message } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Product } from '../types'
import { useState } from 'react'
import FloatingMenu from '../components/FloatingMenu'
import ProductFormDrawer from '../components/ProductFormDrawer'
import QuotationFormModal from '../components/QuotationFormModal'
import { useTranslation } from 'react-i18next'
import {
  useCotizaDetail,
  useDeleteProductFromQuotation,
  useUpdateRate,
  useSendQuotationByEmail,
  useDownloadPDF
} from '../api/cotiza'

const QuotationDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { data: quotation, error, isLoading, refetch } = useCotizaDetail(id!)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const { t } = useTranslation()
  const deleteProductMutation = useDeleteProductFromQuotation()
  const updateRateMutation = useUpdateRate()
  const sendQuotationByEmailMutation = useSendQuotationByEmail()
  const downloadMutation = useDownloadPDF()

  const columns = [
    {
      title: t('quotationDetails.productTableTitle'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('productForm.price'),
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: t('productForm.quantity'),
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: t('productForm.totalPrice'),
      key: 'totalPrice',
      render: (_: any, product: Product) => `$${(product.price * product.amount).toFixed(2)}`,
    },
    {
      title: t('productForm.tax'),
      dataIndex: 'iva',
      key: 'iva',
      render: (iva: boolean) => (iva ? 'Sí' : 'No'),
    },
    {
      title: t('actions'),
      key: 'actions',
      render: (record: Product) => (
        <Button.Group>
          <Button icon={<EditOutlined />} onClick={() => openEditProductDrawer(record)} />
          <Popconfirm
            title={t('quotationDetails.deleteConfirmTitle')}
            description={t('quotationDetails.deleteConfirmDescription')}
            onConfirm={() => handleDeleteProduct(record._id)}
            okText={t('quotationDetails.confirmOkText')}
            cancelText={t('quotationDetails.confirmCancelText')}
          >
            <Button icon={<DeleteOutlined />} loading={deleteProductMutation.isPending && deleteProductMutation.variables?.id === record._id} />
          </Popconfirm>
        </Button.Group>
      ),
    }
  ]

  const handleUpdateRate = () => {
    updateRateMutation.mutate({ id: id! }, {
      onSuccess: () => {
        messageApi.open({
          type: 'success',
          content: `Tasa actualizada correctamente`,
        })
        refetch()
      }
    })
  }

  const handleSendEmail = () => {
    sendQuotationByEmailMutation.mutate(id!, {
      onSuccess: () => {
        messageApi.open({
          type: 'success',
          content: `Correo enviado correctamente`,
        })
      }
    })
  }

  const handleDownloadPDF = (id: string, number: string, type: string) => {
    downloadMutation.mutate({ id, number, type }, {
      onSettled: () => {
        messageApi.open({
          type: 'success',
          content: `PDF Generado correctamente`,
        })
      }
    })
  }

  const handleMenuClick = (key: string) => {
    if (key === 'edit') {
      setModalVisible(true)
    } else if (key === 'update-rate') {
      handleUpdateRate()
    } else if (key === 'send-email') {
      handleSendEmail()
    } else if (key === 'generate-pdf') {
      handleDownloadPDF(id!, `${quotation?.number}`, 'factura')
    } else if (key === 'pdf-forma-libre') {
      handleDownloadPDF(id!, `${quotation?.number}`, 'forma-libre')
    } else if (key === 'budget') {
      handleDownloadPDF(id!, `${quotation?.number}`, 'presupuesto')
    }
  }

  const handleDeleteProduct = (productId: string) => {
    deleteProductMutation.mutate({ id: productId, idParent: id! }, {
      onSuccess: () => {
        messageApi.open({
          type: 'success',
          content: `Producto Borrado correctamente`,
        })
        refetch()
      }
    })
  }

  const showDrawer = () => {
    setEditingProduct(null)
    setDrawerVisible(true)
  }

  const openEditProductDrawer = (product: Product) => {
    setEditingProduct(product)
    setDrawerVisible(true)
  }

  const closeDrawer = () => {
    setDrawerVisible(false)
    setEditingProduct(null)
  }

  const handleFormSubmit = () => {
    messageApi.open({
      type: 'success',
      content: `Producto agregado correctamente`,
    })
    refetch()
    closeDrawer()
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const onUpdated = () => {
    messageApi.open({
      type: 'success',
      content: `Cotizacion editada correctamente`,
    })
    setModalVisible(false)
    refetch()
  }

  if (isLoading) {
    return (
      <div className="md:p-4">
        <Row gutter={16} className="mb-4">
          <Col span={12}>
            <Card>
              <Skeleton active title={false} paragraph={{ rows: 6 }} />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Skeleton active title={false} paragraph={{ rows: 6 }} />
            </Card>
          </Col>
        </Row>
        <Card>
          <Skeleton active title={false} paragraph={{ rows: 10 }} />
        </Card>
      </div>
    )
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!quotation) {
    return <div>No data found</div>
  }

  return (
    <div className="md:p-4">
      {contextHolder}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card title={quotation.title} bordered={false}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label={t('quotationDetails.invoiceNumber')}>{quotation.number}</Descriptions.Item>
            <Descriptions.Item label={t('quotationDetails.date')}>{quotation.date}</Descriptions.Item>
            <Descriptions.Item label={t('quotationDetails.subtotal')}>{`$${quotation.amount.toFixed(2)}`}</Descriptions.Item>
            <Descriptions.Item label={t('quotationDetails.tax')}>{`$${quotation.totalIva.toFixed(2)}`}</Descriptions.Item>
            <Descriptions.Item label={t('quotationDetails.total')}>{`$${quotation.total.toFixed(2)}`}</Descriptions.Item>
            <Descriptions.Item label={t('quotationDetails.exchangeRate')}>{quotation.rate}</Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title={`${quotation.customer.name} ${quotation.customer.lastname}`} bordered={false}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label={t('quotationDetails.customerTitle')}>{quotation.customer.title}</Descriptions.Item>
            <Descriptions.Item label={t('quotationDetails.email')}>{quotation.customer.email}</Descriptions.Item>
            <Descriptions.Item label={t('quotationDetails.phone')}>{quotation.customer.phone}</Descriptions.Item>
            <Descriptions.Item label={t('quotationDetails.taxId')}>{quotation.customer.rif}</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>

      <Card title={
        <div className="flex justify-between items-center">
          <span>{t('quotationDetails.productTableTitle')}</span>
          <Button
            type="primary"
            onClick={showDrawer}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            {t('quotationDetails.addProductButton')}
          </Button>
        </div>
      } bordered={false}>
        <Table columns={columns} dataSource={quotation.products} rowKey="_id" scroll={{ x: '100%' }} className="overflow-x-auto" />
      </Card>

      <ProductFormDrawer
        visible={drawerVisible}
        onClose={closeDrawer}
        onSubmit={handleFormSubmit}
        quotationId={id!}
        initialValues={editingProduct}
      />

      <QuotationFormModal
        visible={modalVisible}
        onCancel={closeModal}
        onOk={onUpdated}
        initialValues={quotation}
      />
      <FloatingMenu
        onMenuClick={handleMenuClick}
        loading={updateRateMutation.isPending || sendQuotationByEmailMutation.isPending || downloadMutation.isPending}
      />
    </div>
  )
}

export default QuotationDetails
