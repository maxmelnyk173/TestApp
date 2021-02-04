using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TestTaskApp.Application.Common.Interfaces;
using TestTaskApp.Application.Products.Queries.ViewModels;

namespace TestTaskApp.Application.Products.Queries.GetProductsList
{
    public class GetProductsListQueryHandler : IRequestHandler<GetProductsListQuery, List<ProductVm>>
    {
        private readonly IApplicationDbContext _context;

        public GetProductsListQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public Task<List<ProductVm>> Handle(GetProductsListQuery product, CancellationToken cancellationToken)
        {
            var result = _context.Products
                                 .Include(c => c.Categories)
                                 .Select(product => new ProductVm
                                 {
                                     ProductId = product.ProductId,
                                     ProductName = product.ProductName,
                                     Version = product.Version,
                                     Size = product.Size,
                                     CompanyName = product.CompanyName,
                                     URL = product.URL,
                                     VendorContact = product.VendorContact,
                                     ReleasedOn = product.ReleasedOn,
                                     Categories = product.Categories
                                                        .Select(category => new ProductCategoryVm
                                                        {
                                                            CategoryId = category.CategoryId,
                                                            CategoryName = category.CategoryName
                                                        }).ToList()

                                 }).ToListAsync(cancellationToken);

            return result;
        }
    }
}
