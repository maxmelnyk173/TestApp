using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TestTaskApp.Application.Common.Interfaces;
using TestTaskApp.Domain.Entities;

namespace TestTaskApp.Application.Products.Commands.CreateProduct
{
    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, Guid>
    {
        private readonly IApplicationDbContext _context;

        public CreateProductCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Guid> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            var entity = new Product
            {
                ProductId = new Guid(),
                ProductName = request.ProductName,
                Version = request.Version,
                Size = request.Size,
                CompanyName = request.CompanyName,
                URL = request.URL,
                VendorContact = request.VendorContact,
                ReleasedOn = request.ReleasedOn
            };

            foreach (var item in request.CategoryVms)
            {
                var category = _context.Categories.FirstOrDefault(x => x.CategoryId == item.CategoryId);

                entity.Categories.Add(category);
            }

            _context.Products.Add(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return entity.ProductId;
        }
    }
}
