//! SDKWork game catalog service contracts.

pub mod domain;
pub mod ports;
pub mod service;

pub use domain::models::{GameError, GameMatchItem, GameMatchPage, GameMatchQuery, GameResult};
pub use ports::repository::GameMatchRepository;
pub use service::GameMatchService;
