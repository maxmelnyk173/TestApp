using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TestTaskApp.Application.Products.Commands.CreateProduct;
using TestTaskApp.Application.Products.Commands.DeleteProduct;
using TestTaskApp.Application.Products.Commands.UpdateProduct;
using TestTaskApp.Application.Products.Queries.GetProductById;
using TestTaskApp.Application.Products.Queries.GetProductsList;
using TestTaskApp.Application.Products.Queries.ViewModels;

namespace TestTaskApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ApiController
    {
        //// GET: api/Products
        [HttpGet]
        public async Task<ActionResult<List<ProductVm>>> GetAll()
        {
            return Ok(await Mediator.Send(new GetProductsListQuery()));
        }

        //// GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductVm>> Get(Guid id)
        {
            var business = await Mediator.Send(new GetProductByIdQuery { ProductId = id });

            if (business == null)
            {
                return NotFound();
            }

            return Ok(business);
        }

        //// PUT: api/Products/{id}
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Update(Guid id, [FromBody] UpdateProductCommand command)
        {
            if (id != command.ProductId)
            {
                return BadRequest();
            }

            await Mediator.Send(command);

            return NoContent();
        }

        // POST: api/Products
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<Guid>> Create([FromBody] CreateProductCommand command)
        {
            var id = await Mediator.Send(command);

            return Ok(id);
        }

        // DELETE: api/Products/{id}
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(Guid id)
        {
            await Mediator.Send(new DeleteProductCommand { ProductId = id });

            return NoContent();
        }
    }
}
