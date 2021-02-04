using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using TestTaskApp.Application.Common.Exceptions;
using TestTaskApp.Application.Common.Interfaces;

namespace TestTaskApp.Application.Products.Commands.DeleteProduct
{
    public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand>
    {
        private readonly IApplicationDbContext _context;

        public DeleteProductCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Products.Include(c => c.Categories).FirstOrDefaultAsync(x => x.ProductId == request.ProductId);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Products), request.ProductId);
            }

            _context.Products.Remove(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
