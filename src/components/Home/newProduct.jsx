import React, { useContext, useState, useEffect } from 'react'
import DataContext from '../../context/DataContext'
import BtnBlack from '../../shared/btnBlack'
import { quicelum } from '../../assets/content'
import SkeletonInfo from '../../shared/skeletonInfo'
import { useNavigate } from 'react-router-dom'
import Flex from '../Flex'



function NewProduct() {

    const { newProducts, loadingData } = useContext(DataContext)
    const [oneProduct, setOneProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (newProducts) {
            const productsValues = Math.floor(Math.random() * newProducts.length)
            const anyProductValue = newProducts[productsValues]
            setOneProduct(anyProductValue)
            if (!loadingData) {
                setLoading(false)
            }

        }

    }, [newProducts])


    if (loading) {
        return (
            <>
                <SkeletonInfo hb1={20} wb1={100} hb2={30} wb2={50} hb3={20} wb3={40} />
            </>
        )
    }


    return (
        <>
            {
                oneProduct ? (
                    <>
                        <Flex key={oneProduct.id} className='p-6 lg:p-12 w-4/6 flex flex-col justify-between'>
                            <div>
                                <h5 className='text-customOrange mb-4 text-xl'>Nuevo!</h5>
                                <h1 className='text-black text-4xl lg:text-6xl font-bold mb-4'>{oneProduct.name}</h1>
                                <h2 className='text-xl font-bold lg:text-2xl lg:w-5/6 mb-4 lg:mb-14 text-black'>{oneProduct.Category.name}</h2>
                                <p className='line-clamp-2'>{oneProduct.description}</p>
                            </div>
                            <BtnBlack className='mt-4 lg:w-2/4 w-[130px] lg:h-1/6 mb-4' text='Ver Productos' onClick={() => navigate('/shop')} />
                        </Flex>
                        <div className='w-2/6 relative overflow-hidden'>
                            <img onClick={()=>navigate(`products/${oneProduct.id}`)} className='cursor-pointer relative lg:absolute top-0 lg:top-10 h-[400px] lg:h-[500px]' src={oneProduct.img_url} alt="product" />
                        </div>

                    </>
                ) : (
                    <></>
                )
            }


        </>
    )
}

export default NewProduct;