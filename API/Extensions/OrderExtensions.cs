using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        private static string ProjectOrderStatusToStr(OrderStatus orderStatus)
        {
            if (orderStatus == OrderStatus.Pending)
            {
                return "Pending";
            }
            else if (orderStatus == OrderStatus.PaymentReceived)
            {
                return "Payment Reveived";
            }
            else if (orderStatus == OrderStatus.PaymentFailed)
            {
                return "Payment Failed";
            }
            return null;
        }

        public static IQueryable<OrderDto> ProjectOrderToOrderDto(this IQueryable<Order> query)
        {
            return query
                .Select(order => new OrderDto
                {
                    Id = order.Id,
                    BuyerId = order.BuyerId,
                    OrderDate = order.OrderDate,
                    ShippingAddress = order.ShippingAddress,
                    DeliveryFee = order.DeliveryFee,
                    Subtotal = order.Subtotal,
                    OrderStatus = ProjectOrderStatusToStr(order.OrderStatus),
                    Total = order.GetTotal(),
                    OrderItems = order.OrderItems.Select(item => new OrderItemDto
                    {
                        ProductId = item.ItemOrdered.ProductId,
                        Name = item.ItemOrdered.Name,
                        PictureUrl = item.ItemOrdered.PictureUrl,
                        Price = item.Price,
                        Quantity = item.Quantity
                    }).ToList()
                }).AsNoTracking();
        }
    }
}