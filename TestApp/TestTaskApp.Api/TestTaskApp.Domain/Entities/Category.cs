using System.Collections.Generic;

namespace TestTaskApp.Domain.Entities
{
    public class Category
    {
        public int CategoryId { get; set; }

        public string CategoryName { get; set; }

        public List<Product> Products { get; set; } = new List<Product>();
    }
}
