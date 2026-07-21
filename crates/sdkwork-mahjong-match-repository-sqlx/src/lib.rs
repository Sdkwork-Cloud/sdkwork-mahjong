//! SQLx-backed game catalog repository.

mod backend;
mod memory;
mod sqlx;

pub use backend::GameMatchRepositoryBackend;
pub use memory::InMemoryGameMatchRepository;
pub use sqlx::SqlxGameMatchRepository;
