using MediatR;
using System.Collections.Generic;
using TestTaskApp.Application.Products.Queries.ViewModels;

namespace TestTaskApp.Application.Products.Queries.GetProductsList
{
    public class GetProductsListQuery : IRequest<List<ProductVm>>
    {
    }
}
