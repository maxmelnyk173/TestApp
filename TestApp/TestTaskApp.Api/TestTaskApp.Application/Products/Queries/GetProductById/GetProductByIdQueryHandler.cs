using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TestTaskApp.Application.Common.Interfaces;
using TestTaskApp.Application.Products.Queries.ViewModels;

namespace TestTaskApp.Application.Products.Queries.GetProductById
{
    public class GetProductByIdQueryHandler : IRequestHandler<GetProductByIdQuery, ProductVm>
    {
        private readonly IApplicationDbContext _context;

        public GetProductByIdQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ProductVm> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
        {
            var result = await _context.Products
                             .Include(c => c.Categories)
                             .Where(p => p.ProductId == request.ProductId)
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

                             }).FirstOrDefaultAsync(cancellationToken);

            return result;
        }
    }
}
