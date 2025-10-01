import {menuArray} from './data.js'
import { v4 as uuidv4 } from 'uuid';

const itemContainer = document.getElementById('item-container')
const orderContainer = document.getElementById('order-container')
const orderBtn = document.getElementById('order-btn')
const orderList = document.getElementById('order-list')
const totalPrice = document.getElementById('total-price')
const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')
let orders = []

const menuList = menuArray.map((item)=>{
    const {name, ingredients, id, price, emoji} = item
    return `
        <div class='item'>
            <p class="emoji">${emoji}</p>
            <div class="item-info">
                <p class="title">${name}</p>
                <p class="ingredients">${[...ingredients]}</p>
                <p class="price">$${price}</p>
            </div>
            <button class="add-item-btn" data-id="${id}" data-uuid="${uuidv4()}">+</button>
        </div>
    `
})

itemContainer.innerHTML = menuList.join('')

itemContainer.addEventListener('click', (e)=>{
    const addItemBtn = e.target.closest('.add-item-btn');
    if(addItemBtn){
        const itemId = Number(addItemBtn.dataset.id);
        const itemObj = menuArray.find((item)=>{
            return item.id === itemId
            })
        if(itemObj){
            const newItem = {...itemObj, uuid: uuidv4()}
             orders.push(newItem)
        }
        orderContainer.style.display = 'block'
        renderOrderList(orders)
    }
})

orderContainer.addEventListener('click', (e)=>{
    const removeOrderBtn = e.target.closest('.remove-order-btn');
    if(removeOrderBtn){
        const itemId = removeOrderBtn.dataset.uuid;
        orders = orders.filter((order) => { return order.uuid != itemId})
        renderOrderList(orders)
    }
})

function renderOrderList(orders){
    if(orders.length > 0){
        const orderHtml = orders.map((order)=>{
            const {name, price, uuid} = order
            return `
                <div id="order-item" class="order-item">
                    <div class="left">
                        <span class="title">${name}</span>
                        <button class="remove-order-btn" data-uuid=${uuid}>remove</button>
                    </div>
                    <span class="title">$${price}</span>
                </div>
                `
        }).join('')
        orderList.innerHTML = orderHtml 
        
        const orderPrices = orders.map((order)=>{return order.price})
        const totalOrderPrice = orderPrices.reduce((total, current)=>{ return total + current}, 0)
        
        totalPrice.innerHTML = `<span class="title">Total price:</span><span class="title">$${totalOrderPrice}</span>`
    }
    else{
        orderContainer.style.display = 'none'
    } 
}

orderBtn.addEventListener('click', ()=>{
    overlay.style.display = 'block'
    modal.style.display = 'flex'
})

overlay.addEventListener('click', ()=>{
    overlay.style.display = 'none'
    modal.style.display = 'none'
})