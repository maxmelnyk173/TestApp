using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TestTaskApp.Application.Common.Exceptions;
using TestTaskApp.Application.Common.Interfaces;
using TestTaskApp.Domain.Entities;

namespace TestTaskApp.Application.Products.Commands.UpdateProduct
{
    public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand>
    {
        private readonly IApplicationDbContext _context;

        public UpdateProductCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Products.Include(c => c.Categories).FirstOrDefaultAsync(p => p.ProductId == request.ProductId);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Products), request.ProductId);
            }

            entity.ProductName = request.ProductName;
            entity.Version = request.Version;
            entity.Size = request.Size;
            entity.CompanyName = request.CompanyName;
            entity.URL = request.URL;
            entity.VendorContact = request.VendorContact;
            entity.ReleasedOn = request.ReleasedOn;
            entity.Categories = request.CategoryVms.Select(c => new Category
            {
                CategoryId = c.CategoryId,
                CategoryName = c.CategoryName
            }).ToList();

            _context.Products.Update(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
