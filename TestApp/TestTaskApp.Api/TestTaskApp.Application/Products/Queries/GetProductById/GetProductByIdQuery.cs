using MediatR;
using System;
using TestTaskApp.Application.Products.Queries.ViewModels;

namespace TestTaskApp.Application.Products.Queries.GetProductById
{
    public class GetProductByIdQuery : IRequest<ProductVm>
    {
        public Guid ProductId { get; set; }
    }
}
